const mongoose = require('mongoose');
const {Schema} = mongoose;
const CheckListItemSchema = require('./CheckListItem');

const CheckListSchema = new Schema({
  title: String,
  items: [CheckListItemSchema],
  createDate: Date,
  _user: {type: Schema.Types.ObjectId, ref: 'users'},
});

mongoose.model('checklists', CheckListSchema);
