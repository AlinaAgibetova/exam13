const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {nanoid} = require('nanoid');
const axios = require('axios');
const path = require('path');
const config = require('../config');
const fs = require('fs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: async function (value) {
        if (!this.isModified('email')) return true;

        const checkUser = await User.findOne({email: value});
        if (checkUser) return false;
      },
      message: 'Пользователь с таким почтовым адресом уже зарегистрирован'
    }
  },
  password: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    validate: {
      validator: async value => {
        if (!value){
          return true;
        }
      }
    }
  },
  role: {
    type: String,
    required: true,
    default: 'user',
    enum: ['user', 'admin']
  }

});

const SALT_WORK_FACTOR = 10;

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  const hash = await bcrypt.hash(this.password, salt);

  this.password = hash;
  next();
});

UserSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  },
});

UserSchema.methods.generateToken = function () {
  this.token = nanoid();
};

UserSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
};


const User = mongoose.model('User', UserSchema);
module.exports = User;

