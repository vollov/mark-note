var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  title: String,
  id:  { type : String , unique : true, required : true, dropDups: false },
  hours: { type: Number },
  tag: { type: mongoose.Schema.Types.ObjectId, ref: 'Tag' },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
  content: String,
  created: { type: Date, default: Date.now }
});

mongoose.model('Post', PostSchema);
