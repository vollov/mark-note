var should = require('should'); 
var assert = require('assert');
 
var mongoose = require('mongoose');
var _ = require('underscore');

require('../../../models/Messages');
var Message = mongoose.model('Message');


var cfg = require('../../../config.js');
var bunyan = require('bunyan');
var log = bunyan.createLogger(_.extend(cfg.test_log, {name: 'test_message'}));

describe('Messages DB', function() {
	
	before(function(done){
		log.debug('setup test in before()');
		
		mongoose.connect('mongodb://localhost/'+ cfg.db.name, function(err,db){
		    if (!err){
		        log.debug('Connected to db: ' + cfg.db.name);
		    } else{
		        console.dir(err); //failed to connect
		    }
		    done();
		});
	});
	
	describe('list all messages', function() {
		
		it('should find all messages ', function(done) { 
			Message.find({}).select('id_ title content').exec(function(err, messages) {
				if (err) {
					log.debug('DB -- all message, err = %j', err);
					//return next(err);
				}
				//console.log(messages);
				done();
			});
		});
	});
	
	after(function(done){
		mongoose.connection.close(function(err) {
			done();
		});
	});
});
