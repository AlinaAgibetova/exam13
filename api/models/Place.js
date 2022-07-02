const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaceSchema = new Schema({
  name: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  review: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  }],
  photo: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  }],
  photoContent: String,
  isAgree: {
    type: Boolean,
    default: true,
    required: true,
  },

});


const Place = mongoose.model('Place', PlaceSchema);
module.exports = Place;
