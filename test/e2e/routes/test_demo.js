var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var _ = require('underscore');

var cfg = require('../../../config.js');
var bunyan = require('bunyan');
var log = bunyan.createLogger(_.extend(cfg.test_log, {name: 'test_demo'}));

describe('Test Demo', function() {

	before(function() {
		log.debug('setup test in before()');
	});

	after(function() {
		log.debug('clean up in after()');
	});

	describe("#parse()", function() {
		it('should return -1 when the value is not present', function() {
			[ 1, 2, 3 ].indexOf(5).should.equal(-1);
			[ 1, 2, 3 ].indexOf(0).should.equal(-1);
		});
	});
});