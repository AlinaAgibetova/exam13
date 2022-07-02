const express = require('express');
const multer = require('multer');
const path = require('path');
const {nanoid} = require('nanoid');
const mongoose = require('mongoose');

const config = require('../config');
const auth = require('../middleware/auth');
const Review = require('../models/Review');

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
    const review = await Review.findById(req.params.id).populate('place', 'name')
      .populate('user', 'displayName')
    // if (!review) {
    //   return res.status(404).send({message: 'Нет такого заведения'});
    // }
    return res.send(review);
  } catch (e) {
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const reviewData = {
      user: req.body.user,
      content: req.body.content,
      place: req.body.place,
      qualityOfService: req.body.qualityOfService,
      qualityOfFood: req.body.qualityOfFood,
      interior: req.body.interior
    }

    const review = new Review(reviewData);
    await review.save();

    return res.send(
      {message: 'Created new review', id: review._id});
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', auth, async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.send({message: 'ok'});
    }
    if (req.user.role === 'user') {
      if (!review.user.equals(req.user._id)) {
        return res.status(403).send({error: 'У Вас нет на это прав'});
      }
    }
    await review.remove();
    res.send(review);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
