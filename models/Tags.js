var mongoose = require('mongoose');

var TagSchema = new mongoose.Schema({
  name: String,
  id:String
});

mongoose.model('Tag', TagSchema);