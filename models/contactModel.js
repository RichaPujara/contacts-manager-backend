const mongoose = require('./connection');
const contactSchema = new mongoose.Schema({
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  contact_type: {
    type: String,
    enum: [
      "mobile",
      "home",
      "work",
      "other"
    ]
  },
  contact_number: {
    type: Number,
    required: true
  }
})
const contactModel = mongoose.model("Contact", contactSchema);

module.exports = contactModel;