var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Post = mongoose.model('Post');

var _ = require('underscore');
var cfg = require('../config');
var log = require('../lib/logger');
var express = require('express');
var router = express.Router();

/**
 * List all
 */
router.get('/', function(req, res, next) {

	log.debug('HTTP GET /posts -- all post, req =');
	// .sort('id')
	var promise = Post.find({}).populate('tag tags').select().exec();

	promise.then((posts) => {
		log.debug('posts = %j', _.pluck(posts, 'id') );
	  return res.status(200).json(posts);
	})
	.catch((err) => {
		log.error('HTTP GET /posts -- all post, err = %j', err);
		return res.status(500).json(err);
	});
});

/**
 * Create post
 */
router.post('/', function(req, res, next) {
	log.debug('HTTP POST a post= %j', req.body);
	var promise = new Post(req.body).save();

	promise.then((post)=>{
		log.debug('saved post with id = ' + post.id);
		return res.status(200).json(post);
	})
	.catch((err) => {
		log.error('HTTP POST /post, err = %j', err);
		return res.status(500).json(err);
	});
});

router.put('/:id', function(req, res, next) {
	var id = req.params.id;
	var p = req.body;

	log.debug('HTTP PUT /tags/:id -- id = %s, tag = %j', id, p);

	var promise = Post.findOne({_id: id}).exec();

	promise.then((post)=>{
		if(!post){
			log.debug('Did not found post in update with id = ' + id);
			return res.status(500).json('Post not found in update');
		}
		log.debug('found post in update with id = ' + post.id);
		_.extend(post,p);
		//		post.title= p.title;
		//		post.id = p.id;
		//		post.content = p.content;
		return post.save();
	})
	.then((post)=>{
		log.debug('updated post with id = ' + post.id);
		return res.status(200).json(post);
	})
	.catch((err) => {
		log.error('HTTP PUT /post, err = %j', err);
		return res.status(500).json(err);
	});
});

router.get('/:id', function(req, res, next) {
	var id = req.params.id;
	log.debug('HTTP GET /posts/:id -- id = %s', id);

	var query = Post.findOne({id: id}).populate('tag tags');

	query.exec(function(err, post) {
		if (err) {
			return next(err);
		}
		if (!post) {
			return next(new Error("can't find post"));
		}

		log.debug('GET by id post= %j', post);
		res.json(post);
	});
});

router.delete('/:id', function(req, res, next){
	var id = req.params.id;
	var query = Post.findById(id).remove();

	query.exec(function(err, post) {
		if (err) {
			return next(err);
		}
		if (!post) {
			return next(new Error("can't find post"));
		}

		log.debug('DELETE by id post= %j', post);
		res.json(post);
	});
});

module.exports = router;
