const mongoose = require('../static/db');
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, },
    email: { type: String, required: true, unique: true, trim: true, },
    password: { type: String, required: true, },
    imageURL:{type:String}
});
const UserModel = mongoose.model('Users', userSchema);
module.exports = UserModel;