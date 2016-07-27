'use strict';

angular.module('post.services', [])
.factory('postService', [ '$http', 'API', function($http, API) {
	
	var service = {
			posts : []
	};
	
	service.getAll = function() {
		return $http.get(API + 'posts')
		.success(function(data) {
			angular.copy(data, service.posts);
		});
	};
	
	service.create = function(post) {
		return $http.post(API + 'posts', post).success(function(data){
			service.posts.push(data);
		});
	};
	
	service.update = function(post, id) {
		return $http.put(API + 'posts/' + id, post).success(function(data){
			//service.posts.push(data);
			return res.data;
		});
	};
	
	service.get = function(id) {
		return $http.get(API + 'posts/' + id).then(function(res) {
			return res.data;
		});
	};
	
	service.deleteById = function(id) {
		return $http.delete(API + 'posts/' + id).then(function(res) {
			return res.data;
		});
	};
	
	return service;
}]);