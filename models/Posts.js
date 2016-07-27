var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  title: String,
  id: String,
  //tag: { type: mongoose.Schema.Types.ObjectId, ref: 'Tag' },
  content: String,
  created: { type: Date, default: Date.now }
});

mongoose.model('Post', PostSchema);