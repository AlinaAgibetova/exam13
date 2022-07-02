const mongoose = require('mongoose');
const config = require('./config');
const User = require('./models/User');
const Place = require('./models/Place');
const {nanoid} = require('nanoid');

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

  await Place.create({
    user: user,
    title: 'Resto1',
    photoContent: 'маргарита.jpg',
    isAgree: true
  }, {
    user: user,
    title: 'Resto2',
    photoContent: 'лимонад.jpeg',
    isAgree: true
  }, {
    user: admin,
    title: 'Resto3',
    photoContent: 'текила.jpeg',
    isAgree: true
  });

  await mongoose.connection.close();
}

run().catch(e => console.error(e));