const mongoose = require('mongoose');
const config = require('./config');
const User = require('./models/User');
const {nanoid} = require('nanoid');

const run = async () => {
  await mongoose.connect(config.mongo.db, config.mongo.options);

  const collections = await mongoose.connection.db.listCollections().toArray();

  for (const coll of collections) {
    await mongoose.connection.db.dropCollection(coll.name);
  }

  const [user, admin] = await User.create({
    email: 'user@track.com',
    password: '123',
    token: nanoid(),
    role: 'user',
    displayName: 'user',
    avatar: 'no_image_available.jpg'
  }, {
    email: 'admin@track.com',
    password: '123',
    token: nanoid(),
    role: 'admin',
    displayName: 'admin',
    avatar: 'no_image_available.jpg'
  })

  await mongoose.connection.close();
}

run().catch(e => console.error(e));