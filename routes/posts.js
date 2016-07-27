var mongoose = require('mongoose');
var Post = mongoose.model('Post');

var _ = require('underscore');
var cfg = require('../config');
var bunyan = require('bunyan');
var log = bunyan.createLogger(_.extend(cfg.logging, {name: 'route-posts'}));

var express = require('express');
var router = express.Router();

/**
 * List all
 */
router.get('/', function(req, res, next) {

	log.debug('HTTP GET /posts -- all post, req =');

	Post.find({}).select().exec(function(err, posts) {
		if (err) {
			log.debug('HTTP GET /posts -- all post, err = %j', err);
			return res.status(500).json(err);
		}
		return res.status(200).json(posts);
	});
});

/**
 * Create post
 */
router.post('/', function(req, res, next) {
	log.debug('HTTP POST a post= %j', req.body);
	var post = new Post(req.body);

	post.save(function(err, post) {
		if (err) {
			return next(err);
		}

		log.debug('saved post with id = ' + post.id)
		res.json(post);
	});
});

router.put('/:id', function(req, res, next) {
	var id = req.params._id;	
	log.debug('HTTP PUT /posts/:id -- id = %s', id);
	
	var query = Post.findById(id);

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

router.get('/:id', function(req, res, next) {
	var id = req.params.id;	
	log.debug('HTTP GET /posts/:id -- id = %s', id);
	
	var query = Post.findById(id);

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