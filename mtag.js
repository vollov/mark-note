// add user
//node manager.js user pwd

var mongoose = require('mongoose');
var _ = require('underscore');

require('./models/Tags');
var Tag = mongoose.model('Tag');

var cfg = require('./config.js');

var name = process.argv[2];

console.log('creating tag name={0}', name);

mongoose.connect('mongodb://localhost/'+ cfg.db.name, function(err,db){
    if (!err){
        console.log('Connected to db: ' + cfg.db.name);
    } else{
        console.dir(err); //failed to connect
    }
});

var tag = new Tag();
tag.name = name;

tag.save(function(err) {
	if (err) {
		console.log(err);
		return;
	}

	console.log('tag created');
	mongoose.disconnect();
});
