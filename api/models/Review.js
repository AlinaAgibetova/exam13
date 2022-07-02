const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  place: {
    type: Schema.Types.ObjectId,
    ref: 'Place',
    required: true
  },
  content: {
    type: String
  },
  qualityOfService: {
    type: Number
  },
  qualityOfFood: {
    type: Number
  },
  interior: {
    type: Number
  }
});


const Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;
