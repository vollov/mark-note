var mongoose = require('mongoose');
var Tag = mongoose.model('Tag');

var _ = require('underscore');
var cfg = require('../config');
var bunyan = require('bunyan');
var log = bunyan.createLogger(_.extend(cfg.logging, {name: 'route-tags'}));

var express = require('express');
var router = express.Router();

/**
 * List all
 */
router.get('/', function(req, res, next) {

	log.debug('HTTP GET /tags -- all tag, req =');

	Tag.find({}).select().exec(function(err, tags) {
		if (err) {
			log.debug('HTTP GET /tags -- all tag, err = %j', err);
			return res.status(500).json(err);
		}
		return res.status(200).json(tags);
	});
});

module.exports = router;