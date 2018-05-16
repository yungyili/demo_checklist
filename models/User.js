const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  email: String,
  password: String
});

mongoose.model('users', UserSchema);
