var should = require('should'); 
var assert = require('assert');
var request = require('supertest');  
var mongoose = require('mongoose');
var _ = require('underscore');

var cfg = require('../../../config.js');
var bunyan = require('bunyan');
var log = bunyan.createLogger(_.extend(cfg.test_log, {name: 'test_message'}));

describe('Messages', function() {
	var url = cfg.test.url;
	var test_message_id;
	
	/**
	 * insert a special message
	 */
	before(function(done){
		log.debug('setup test in before()');
		//mongoose.connect(cfg.test_db.name);
		//message_id_list = [];
		
		var message = {
				title: 'once we have specified the info we',
				content: 'we need to actually perform the action on the resource, in this case we want to' 
			};
			
		request(url)
		.post(cfg.app.api_url + '/messages')
		.send(message)
		.expect('Content-Type', /json/)
		//.expect('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With')
		.expect(200)
		.end(function(err, res) {
			if (err) {
				return done(err);
				//throw err;
			}
			test_message_id = res.body._id;
			//message_id_list.push(res.body._id);
			done();
			//res.body.should.have.property('title', 'once we have specified the info we');
		});
	});


	
	
	// list push()
	describe('read and update', function() {
		
		it('should support find message by id', function(done) { 
			request(url)
			.get(cfg.app.api_url + '/messages/' + test_message_id)
			.expect('Content-Type', /json/)
			//.expect('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With')
			.expect(200)
			.end(function(err, res) {
				if (err) {
					return done(err);
					//throw err;
				}
				log.debug('GET message by id %s', res.body._id);
				//message_id_list.push(res.body._id)
				res.body.should.have.property('title', 'once we have specified the info we');
				done();
			});
		});
		
		it('should support update message', function(done) { 
			
			var message = {
				title: 'once we have specified the info we updated',
				content: 'we need to actually perform the action on the resource, in this case we want to update' 
			};
			
			log.debug('PUT message by id %s', test_message_id);
			
			request(url)
			.put(cfg.app.api_url + '/messages/' + test_message_id)
			.send(message)
			.expect('Content-Type', /json/)
			//.expect('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With')
			//.expect(200)
			.end(function(err, res) {
				if (err) {
					log.error('find all messages err= %j', err);
					return done(err);
					//throw err;
				}
				log.debug('return PUT message by id %s', res.body._id);
				//message_id_list.push(res.body._id)
				res.body.should.have.property('n',1);
				res.body.should.have.property('ok', 1);
				//res.body.should.have.property('nModified', 1);
				done();
			});
		});
	});
	
	after(function (done){
		log.debug('clean up DB in after()');
		
		request(url)
		.delete(cfg.app.api_url + '/messages/' + test_message_id)
		.expect('Content-Type', /json/)
		//.expect('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With')
		.expect(200)
		.end(function(err, res) {
			if (err) {
				return done(err);
				//throw err;
			}
			log.debug('deleted message by id %s', res.body._id);
			//message_id_list.push(res.body._id)
			//res.body.should.have.property('title', 'once we have specified the info we');
			done();
		});
		
//		console.log('clean up in after(), size = ' + message_id_list.length);
//		//value, key, list
//		_.each(message_id_list, function(value){
//			

//		});
//		message_id_list = [];
	});
});