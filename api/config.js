const path = require('path');

const rootPath = __dirname;
let dbUrl = 'mongodb://localhost/exam13';
let port = 8000;


if (process.env.NODE_ENV === 'test') {
  dbUrl = 'mongodb://localhost/exam13-test';
  port = 8010;
}

module.exports = {
  corsWhiteList: [
    'http://localhost:4200',
    'https://localhost:4200',
    'http://localhost:4210',
  ],
  rootPath,
  port,
  uploadPath: path.join(rootPath, 'public/uploads'),
  mongo: {
    db: dbUrl,
    options: {useNewUrlParser: true},
  },
}