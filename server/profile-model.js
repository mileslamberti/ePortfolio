const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const profileSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    number: { type: Number, required: true },
    dob: { type: Number, required: true },
    gender: { type: String, required: true}
});

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;