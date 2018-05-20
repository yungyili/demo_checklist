const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  email: String,
  password: String,
  activated: {type:Boolean, default:true}
});

mongoose.model('users', UserSchema);
