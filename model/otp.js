const mongoose = require('../static/db');
const schema_OTP = new mongoose.Schema({
  email: { type: String, required: true, unique: true, trim: true, },
  OTP: Number,
});
const OTP_Model = mongoose.model('OTP', schema_OTP);
module.exports = OTP_Model