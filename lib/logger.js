'use strict';

var winston = require('winston');
var cfg = require('../config.js');

var logger = new (winston.Logger)({
	exitOnError : false,
	transports : [
	// new (winston.transports.Console)(),
	new (winston.transports.File)({
		name : 'info-file',
		filename : cfg.app.app_root + '/logs/info.log',
		level : 'info'
	}), new (winston.transports.File)({
		name : 'error-file',
		filename : cfg.app.app_root + '/logs/error.log',
		level : 'error'
	}), new (winston.transports.File)({
		name : 'debug-file',
		filename : cfg.app.app_root + '/logs/debug.log',
		level : 'debug'
	}) ]
});

//logger.remove('debug-file');

module.exports = logger;

//var cfg = require('../config.js');
//var path = require('path');
//var bunyan = require('bunyan');
//
//module.exports = function() {
//	// type log\foo.log | node_modules\.bin\bunyan
//	return {
//		getLogger : function() {
//			var logger = bunyan.createLogger({
//				name : cfg.app.name,
//				streams : [ {
//					level : 'debug',
//					type : 'rotating-file',
//					path : path.join(cfg.app.root, 'logs/server.log'),
//					period : '1d', // daily rotation
//					count : 3
//				// keep 3 back copies
//				} ]
//			});
//			return logger;
//		}
//	}
//}

