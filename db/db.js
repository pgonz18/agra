const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/agra';
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const db =  mongoose.connection;

module.exports = db;
