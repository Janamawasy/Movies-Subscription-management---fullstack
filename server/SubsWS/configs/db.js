const mongoose = require('mongoose');

const connectDB = () => {
  mongoose
    .connect('mongodb://127.0.0.1:27017/Mov&SubManegment')
    .then(() => console.log('Connected to Mov&SubManegment!'))
    .catch((error) => console.log('error111:',error));
};

module.exports = connectDB;