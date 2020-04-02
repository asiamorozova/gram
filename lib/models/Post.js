//a reference to user 
//a string photoUrl
//a string caption 
//an array of strings tag 
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  photoUrl: {
    type: String, 
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  tags: {
    type: Array
      
  }
});

schema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'post'
});

module.exports = mongoose.model('Post', schema);
