var mongoose = require('mongoose');

var TagSchema = new mongoose.Schema({
  name: { type : String , unique : true, required : true, dropDups: false },
  id:String
});

mongoose.model('Tag', TagSchema);
