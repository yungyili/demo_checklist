const mongoose = require('mongoose');
const {Schema} = mongoose;

const CheckListItemSchema = new Schema({
  checked: {type:Boolean, default: false},
  content: String
});

module.exports = CheckListItemSchema;
