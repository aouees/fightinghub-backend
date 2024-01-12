const mongoose = require('mongoose');

const databaseName = 'gamer';

mongoose.connect("", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then((e) => console.log("MongoDB Connected"));

module.exports = mongoose