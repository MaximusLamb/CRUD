const mongoose = require('mongoose');

const nameSchema = new mongoose.Schema({
    
  name: {
    type: String,
    require: true
  },
  likes: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  }
});

module.exports = mongoose.model('Shareable', nameSchema);
