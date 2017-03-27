<<<<<<< HEAD
var mongoose = require('mongoose');
var cfg = require('../config');
var express = require('express');
var router = express.Router();

var Role = mongoose.model('Role');
var Permission = mongoose.model('Permission');
var log = require('../lib/logger');

router.get('/', function(req, res, next) {
	Permission.find(function(err, permissions) {
		if (err) {
			log.error('HTTP GET /permissions -- get all permissions, err = %j', err);
			return res.status(500).json(err);
		}

		res.status(200).json(permissions);
	});
});

router.post('/', function(req, res, next) {
	var permission = new Permission(req.body);
	
	permission.save(function(err, permission) {
		if (err) {
			return next(err);
		}

		res.status(200).json(permission);
	});
});

router.get('/:id', function(req, res, next) {
	var id = req.params.id;	
	log.debug('HTTP GET /permissions/:id -- id = %s', id);
	
	var query = Permission.findById(id);//.populate('comments');

	query.exec(function(err, permission) {
		if (err) {
			return next(err);
		}
		if (!permission) {
			return next(new Error("can't find permission"));
		}
		
		log.debug('HTTP GET permission by id, return permission= %j', permission);
		res.status(200).json(permission);
	});
});

router.delete('/:id', function(req, res, next){
	var id = req.params.id;
	var query = Permission.findById(id).remove();
	
	query.exec(function(err, permission) {
		if (err) {
			return next(err);
		}
		if (!permission) {
			return next(new Error("can't find permission"));
		}
		
		log.debug('DELETE by id permission= %j', permission);
		res.status(200).json(permission);
	});
});

router.put('/:id', function(req, res, next) {
	var id = req.params.id;
	var body = req.body;
	
	log.debug('calling put body =%j', body);
	
	Permission.findByIdAndUpdate(id, { $set: body }, function (err, doc) {
		  // if (err) return handleError(err);
		if(err) return next(err);
		  res.status(200).json(doc);
	});
});

=======
var mongoose = require('mongoose');
var cfg = require('../config');
var express = require('express');
var router = express.Router();

var Role = mongoose.model('Role');
var Permission = mongoose.model('Permission');
var log = require('../lib/logger');

router.get('/', function(req, res, next) {
	Permission.find(function(err, permissions) {
		if (err) {
			log.error('HTTP GET /permissions -- get all permissions, err = %j', err);
			return res.status(500).json(err);
		}

		res.status(200).json(permissions);
	});
});

router.post('/', function(req, res, next) {
	var permission = new Permission(req.body);
	
	log.debug('HTTP POST /permissions -- permission = %j', req.body);

	permission.save(function(err, permission) {
		if (err) {
			return next(err);
		}

		res.status(200).json(permission);
	});
});

router.get('/:id', function(req, res, next) {
	var id = req.params.id;	
	log.debug('HTTP GET /permissions/:id -- id = %s', id);
	
	var query = Permission.findById(id);//.populate('comments');

	query.exec(function(err, permission) {
		if (err) {
			return next(err);
		}
		if (!permission) {
			return next(new Error("can't find permission"));
		}
		
		log.debug('HTTP GET permission by id, return permission= %j', permission);
		res.status(200).json(permission);
	});
});

router.delete('/:id', function(req, res, next){
	var id = req.params.id;
	var query = Permission.findById(id).remove();
	
	query.exec(function(err, permission) {
		if (err) {
			return next(err);
		}
		if (!permission) {
			return next(new Error("can't find permission"));
		}
		
		log.debug('DELETE by id permission= %j', permission);
		res.status(200).json(permission);
	});
});

router.put('/:id', function(req, res, next) {
	var id = req.params.id;
	var body = req.body;
	
	log.debug('calling put body =%j', body);
	
	Permission.findByIdAndUpdate(id, { $set: body }, function (err, doc) {
		  // if (err) return handleError(err);
		if(err) return next(err);
		  res.status(200).json(doc);
	});
});

>>>>>>> c9f541252954020da256dbc1f5259c5e6ad5d1b7
module.exports = router;