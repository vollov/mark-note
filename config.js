'use strict';
var path = require('path');

module.exports = {
		
	test:{
		url : 'http://localhost:8000'
	},
	
	test_db:{
		host: 'localhost',
		name: 'mark_note_test',
		port: '27017',
	},
	
	db:{
		host: 'localhost',
		name: 'mark_note',
		port: '27017',
	},
	
	token:{
		secret: 'uwotm8xxc',
		user_property: 'payload', 
		age: '30m'
	},
	
	app:{
		app_root: __dirname,
		api_url:'/api/v1.0',
		port:8000
	}
};