const express = require('express');
const User = require('../models/User');
const mongoose = require('mongoose');
const multer = require('multer');
const config = require('../config');
const {nanoid} = require('nanoid');
const path = require('path');
const axios = require('axios');
const fs = require('fs');
const fetch = require('node-fetch');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },

  filename: (req, file, cb)=>{
    cb(null, nanoid() + path.extname(file.originalname))
  }
});

const upload = multer({storage});

router.get('/', async (req, res, next) => {
  try {
    const users = await User.find();
    return res.send(users);
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findOne({_id: req.params.id});
    return res.send(user);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }

    return next(e);
  }
});

router.post('/', upload.single('avatar'), async (req, res, next) => {
  try {
    const userData = {
      email: req.body.email,
      password: req.body.password,
      displayName: req.body.displayName,
      role: req.body.role,
      token: req.body.token
    };

    if (req.file){
      userData.avatar = req.file.filename;
    }

    const user = new User(userData);
    user.generateToken();
    await user.save();
    return res.send(user);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError){
      return res.status(400).send(e);
    }
  }
  return next(e);
});

router.post('/sessions', async (req, res, next) => {
  try {
    const user = await User.findOne({email: req.body.email});

    if (!user){
      return res.status(400).send({error: 'Username not found'});
    }
    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch){
      return res.status(400).send({error: 'Password is wrong'});
    }
    user.generateToken();
    await user.save();
    return res.send(user);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError){
      return res.status(400).send(e);
    }
    return next(e);
  }
});

router.delete('/sessions', async (req, res, next) => {
  try{
    const token = req.get('Authorization');
    const message = {message: 'OK'}
    if (!token){
      return res.send(message);
    }
    const user = await User.findOne({token});

    if (!user) return res.send(message);

    user.generateToken();
    await user.save();

    return res.send(message);
  } catch (e) {
    next(e);
  }
});

router.post('/facebookLogin', async (req, res, next) => {
  try{
    const inputToken = req.body.authToken;
    const accessToken = config.facebook.appId + '|' + config.facebook.appSecret;

    const debugTokenUrl = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`;
    const response = await axios.get(debugTokenUrl);

    if (response.data.data.error){
      return res.status(401).send({message: 'Facebook token incorrect'})
    }

    if (req.body.id !==response.data.data.user_id){
      return res.status(401).send({message: 'Wrong user ID'});
    }

    let user = await User.findOne({facebookId: req.body.id});

    if (!user){

      const image = `${nanoid()}.jpg`;
      function downLoadFile(url, path){
        return fetch(url).then(res => {
          res.body.pipe(fs.createWriteStream(path));
        })
      }
      downLoadFile(req.body.response.picture.data.url, `./public/uploads/${image}`)
      user = new User({
        email: req.body.email,
        password: nanoid(),
        facebookId: req.body.id,
        displayName: req.body.name,
        avatar: image
      });
    }

    user.generateToken();
    await user.save();
    return res.send(user);
  }catch (e) {
    next(e);
  }
})

module.exports = router;