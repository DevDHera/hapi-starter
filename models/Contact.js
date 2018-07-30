const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Contact Model
const ContactSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('contacts', ContactSchema);
