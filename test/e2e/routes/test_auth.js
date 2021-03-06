var should = require('should'); 
var assert = require('assert');
var request = require('supertest');  
var mongoose = require('mongoose');
var _ = require('underscore');

var cfg = require('../../../config.js');
var bunyan = require('bunyan');
var log = bunyan.createLogger(_.extend(cfg.test_log, {name: 'test_auth'}));


require('../../../models/Users');
var User = mongoose.model('User');


describe('Authentication module', function() {
	var url = cfg.test.url;
	var token;
	
//	after(function(done){
//		log.debug('clean up registration test');
//		
//		mongoose.connect('mongodb://localhost/'+ cfg.db.name);
//		
//		User.remove({username: 'anna'},function(err, status) {
//			log.debug('user anna delete err=%j, status=%j', err, status);
//			if (err) {
//				log.error('auth clean up err=%j', err);
//				done();
//			}
//			if (!status) {
//				log.error('cannot find user in auth clean up.');
//				done();
//			}
//			
//			log.debug('user anna deleted in clean up');
//		});
//
//		done();
//	});
	
	
//	describe('user registration api', function() {
//		
//		it('should be able to do registration', function(done) {
//			var user = {
//				username: 'anna',
//				password: 'pass1' 
//			};
//			
//			request(url)
//			.post(cfg.app.api_url + '/register')
//			.send(user)
//			//.expect('Content-Type', /json/)
//			//.expect('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With')
//			.expect(200)
//			.end(function(err, res) {
//				if (err) {
//					return done(err);
//					//throw err;
//				}
//				log.debug('POST /register return = %j', res.body);
//				token = res.body.token;
//				//message_id_list.push(res.body._id)
//				//res.body.should.have.property('title', 'once we have specified the info we');
//				done();
//			});
//		});
//	});
	
	
	describe('user login api', function() {
		
		it('should be able to login', function(done) {
			var user = {
				username: 'anna',
				password: 'pass1' 
			};
			
			request(url)
			.post(cfg.app.api_url + '/login')
			.send(user)
			//.expect('Content-Type', /json/)
			//.expect('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With')
			.expect(200)
			.end(function(err, res) {
				if (err) {
					return done(err);
					//throw err;
				}
				log.debug('POST /login return = %j', res.body);
				token = res.body.token;
				//message_id_list.push(res.body._id)
				res.body.should.have.property('token', token);
				done();
			});
		});
		
		it('should support find all messages', function(done) { 
			
			log.debug('GET find all messages token = %s', token);
			request(url)
			.get(cfg.app.api_url + '/messages')
			.set('Authorization', 'Bearer ' + token)
			//.expect('Content-Type', /json/)
			//.expect('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With')
			//.expect(200)
			.end(function(err, res) {
				if (err) {
					log.debug('GET find all messages error = %j', err);
					return done(err);
					//throw err;
				}
				
				//var result = JSON.parse(res.body);
				
				log.debug('GET messages = %j', res);
				//message_id_list.push(res.body._id)
				//res.body.should.have.property('title', 'once we have specified the info we');
				done();
			});
		});
	});
	
//	describe('list all messages', function() {
//		
//
//	});
});