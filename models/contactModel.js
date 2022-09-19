const mongoose = require('./connection');
const contactSchema = new mongoose.Schema({
  name_prefix: {
    type: String,
  },
  first_name: {
    type: String,
  },
  middle_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  name_suffix: {
    type: String,
  },
  full_name: {
    type: String,
  },
  nickname: {
    type: String,
  },
  organisation: {
    type: String,
  },
  title: {
    type: String,
  },
  role: {
    type: String,
  },
  gender: {
    type: String,
  },
  photo: {
    type: String,
  },
  work_email: {
    type: String,
  },
  other_email: {
    type: String,
  },
  email: {
    type: String,
  },
  home_phone_number: {
    type: String,
  },
  work_phone_number: {
    type: String,
  },
  pager_number: {
    type: String,
  },
  home_fax_number: {
    type: String,
  },
  work_fax_number: {
    type: String,
  },
  other_phone_number: {
    type: String,
  },
  mobile_number: {
    type: String,
  },
  work_address: {
    type: String,
  },
  other_address: {
    type: String,
  },
  home_address: {
    type: String,
  },
});
const contactModel = mongoose.model("Contact", contactSchema);

module.exports = contactModel;