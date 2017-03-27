var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var Tag = mongoose.model('Tag');

var _ = require('underscore');
var cfg = require('../config');
var log = require('../lib/logger');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

	log.debug('HTTP GET /tags -- all tag, req =');

	var promise = Tag.find({}).select().exec();

	promise.then((tags) => {
	  return res.status(200).json(tags);
	})
	.catch((err) => {
		log.error('HTTP GET /tags -- all tags, err = %j', err);
		return res.status(500).json(err);
	});
});

router.post('/', function(req, res, next) {
	log.debug('HTTP POST a tag= %j', req.body);
	var promise = new Tag(req.body).save();

	promise.then((tag)=>{
		log.debug('saved tag with id = ' + tag.id);
		return res.status(200).json(tag);
	})
	.catch((err) => {
		log.error('HTTP POST /tags, err = %j', err);
		return res.status(500).json(err);
	});
});

router.put('/:id', function(req, res, next) {
	var id = req.params.id;
	var p = req.body;

	log.debug('HTTP PUT /tags/:id -- id = %s, tag = %j', id, p);

	var promise = Tag.findOne({_id: id}).exec();

	promise.then((tag)=>{
		log.debug('found tag in update with id = ' + tag.id);
		_.extend(tag,p);
		return tag.save();
	})
	.then((tag)=>{
		log.debug('updated tag with id = ' + tag.id);
		return res.status(200).json(tag);
	})
	.catch((err) => {
		log.error('HTTP PUT /tag, err = %j', err);
		return res.status(500).json(err);
	});
});

router.get('/:id', function(req, res, next) {
	var id = req.params.id;
	log.debug('HTTP GET /tags/:id -- id = %s', id);

	var promise = Tag.findOne({_id: id}).exec();

	promise.then((tag) => {
		if (!tag) {
			return res.status(500).json("can't find tag");
		}
	  return res.status(200).json(tag);
	})
	.catch((err) => {
		log.error('HTTP GET /tags/:id, err = %j', err);
		return res.status(500).json(err);
	});
});

router.delete('/:id', function(req, res, next){
	var id = req.params.id;
	var promise = Tag.findById(id).remove().exec();

	//return result {ok: 1, n: 1}
	promise.then((result) => {
		// if (!tag) {
		// 	return res.status(500).json("can't find tag");
		// }
		return res.status(200).json(result);
	})
	.catch((err) => {
		log.error('HTTP DELETE /tags/:id, err = %j', err);
		return res.status(500).json(err);
	});
});

module.exports = router;
