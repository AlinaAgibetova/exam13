const express = require('express');
const multer = require('multer');
const path = require('path');
const {nanoid} = require('nanoid');
const mongoose = require('mongoose');

const config = require('../config');
const auth = require('../middleware/auth');
const Place = require('../models/Place');
const User = require('../models/User');

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

router.get('/', async (req, res, next) => {
  try {
    const place = await Place.find().populate("user", "displayName");
    return res.send(place);
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const place = await Place.findById(req.params.id)
      .populate([{path: 'review.user', select: 'displayName photo'}])
    if (!place) {
      return res.status(404).send({message: 'Нет такого заведения'});
    }
    return res.send(place);
  } catch (e) {
    next(e);
  }
});

router.post('/', auth, upload.single('photoContent'), async (req, res, next) => {
  try {
    const placeData = {
      title: req.body.title,
      user: req.body.user,
      review: req.body.review,
      photoContent: null,
      description: req.body.description,
      isAgree: true,
    }

    if (req.file){
      placeData.photoContent = req.file.filename;
    }

    const place = new Place(placeData);
    await place.save();

    return res.send(
      {message: 'Created new place', id: place._id});
  } catch (e) {
    next(e);
  }
});

router.post('/:id/review', auth, async (req, res, next) => {
  try {
    const place = await Place.findById(req.params.id).populate('user', 'displayName');
    if (!place) {
      return res.status(404).send({error: 'Page not found'});
    }

    const checkReview = place.review.find((review) => review.user.equals(req.user._id));
    if (checkReview) {
      return res.send(place);
    }

    place.review.push({user: req.user._id});
    await place.save();

    res.send(place);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return next(e);
    }

    next(e);
  }
});

router.delete('/:id', auth, async (req, res, next) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) {
      return res.send({message: 'ok'});
    }
    if (req.user.role === 'user') {
      if (!place.user.equals(req.user._id)) {
        return res.status(403).send({error: 'У Вас нет на это прав'});
      }
    }
    await place.remove();
    res.send(place);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
