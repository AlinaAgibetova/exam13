const mongoose = require('mongoose');
const config = require('./config');
const User = require('./models/User');
const Place = require('./models/Place');
const {nanoid} = require('nanoid');
const Review = require("./models/Review");
const Photo = require("./models/Photo");

const run = async () => {
  await mongoose.connect(config.mongo.db, config.mongo.options);

  const collections = await mongoose.connection.db.listCollections().toArray();

  for (const coll of collections) {
    await mongoose.connection.db.dropCollection(coll.name);
  }

  const [user, admin] = await User.create({
    email: 'user@place.com',
    password: '123',
    token: nanoid(),
    role: 'user',
    displayName: 'user',
    avatar: 'no_image_available.jpg'
  }, {
    email: 'admin@place.com',
    password: '123',
    token: nanoid(),
    role: 'admin',
    displayName: 'admin',
    avatar: 'no_image_available.jpg'
  });

  const [Resto, Club, Pub] = await Place.create({
    user: user,
    title: 'Resto',
    photoContent: 'маргарита.jpg',
    isAgree: true,
    rate: '5',
  }, {
    user: user,
    title: 'Club',
    photoContent: 'лимонад.jpeg',
    isAgree: true,
    rate: '5',
  }, {
    user: admin,
    title: 'Pub',
    photoContent: 'текила.jpeg',
    isAgree: true,
    rate: '5',
  });

  const [lim, ava, pub] = await Photo.create({
    user: user,
    place: Resto,
    photo: 'маргарита.jpg'
  }, {
    user: user,
    place: Club,
    photo: 'лимонад.jpeg'
  }, {
    user: user,
    place: Pub,
    photo: 'текила.jpeg'
  });


  const [review1, review2, review3] = await Review.create({
    user: user,
    place: Resto,
    content: 'About something',
    qualityOfService: 5,
    qualityOfFood: 5,
    interior: 5
  }, {
    user: user,
    place: Club,
    content: 'About something',
    qualityOfService: 5,
    qualityOfFood: 5,
    interior: 5
  }, {
    user: user,
    place: Pub,
    content: 'About something',
    qualityOfService: 5,
    qualityOfFood: 5,
    interior: 5
  });



  await mongoose.connection.close();
}

run().catch(e => console.error(e));