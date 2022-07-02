const express = require('express');
const multer = require('multer');
const path = require('path');
const {nanoid} = require('nanoid');
const mongoose = require('mongoose');

const config = require('../config');
const auth = require('../middleware/auth');
const Photo = require('../models/Photo');
const permit = require("../middleware/permit");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname))
  }
});

const upload = multer({storage});

router.get('/:id', async (req, res, next) => {
  try {
    const photo = await Photo.findById(req.params._id).populate('photo', 'id')
      .populate('user', 'displayName')
    // if (!review) {
    //   return res.status(404).send({message: 'Нет такого заведения'});
    // }
    return res.send(photo);
  } catch (e) {
    next(e);
  }
});

router.post('/', auth, permit('user', 'admin'), upload.single('photo'), async (req, res, next) => {
  try {
    const photoData = {
      user: req.user.id,
      place: req.body.place,
      photo: null
    }

    if (req.file){
      photoData.photo = req.file.filename;
    }

    const photo = new Photo(photoData);
    await photo.save();

    return res.send(
      {message: 'Created new photo', id: photo._id});
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', auth, async (req, res, next) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo) {
      return res.send({message: 'ok'});
    }
    if (req.user.role === 'user') {
      if (!photo.user.equals(req.user._id)) {
        return res.status(403).send({error: 'У Вас нет на это прав'});
      }
    }
    await photo.remove();
    res.send(photo);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
