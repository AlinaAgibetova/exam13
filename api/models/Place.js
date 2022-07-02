const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaceSchema = new Schema({
  title: {
    type: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  photo: {
    type: Schema.Types.ObjectId,
    ref: 'Photo',
  },
  photoContent: String,
  description: String,

  rate: {
    type: String,
    default: 0,
  },
  isAgree: {
    type: Boolean,
    default: true,
    required: true,
  },

});


const Place = mongoose.model('Place', PlaceSchema);
module.exports = Place;
