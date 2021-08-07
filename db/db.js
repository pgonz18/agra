const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/agra', {useNewUrlParser: true, useUnifiedTopology: true});

const db =  mongoose.connection;

module.exports = db;
