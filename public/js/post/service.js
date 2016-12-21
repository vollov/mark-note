'use strict';

angular.module('post.services', [])
.factory('postService', [ '$http', 'API', '_', function($http, API, _) {
	
	var service = {
			posts : [], 
			tags : []
	};
	
	service.getAll = function() {
		return $http.get(API + 'posts')
		.success(function(data) {
			angular.copy(data, service.posts);
		});
	};
	
	service.getTags = function() {
		return $http.get(API + 'tags')
		.success(function(data) {
			angular.copy(data, service.tags);
		});
	};
	
	service.create = function(post) {
		return $http.post(API + 'posts', post).success(function(data){
			service.posts.push(data);
		});
	};
	
	service.update = function(post, id) {
		console.log('service put post by id = %s', id);
		return $http.put(API + 'posts/' + id, post).success(function(data){
			//service.posts.push(data);
			console.log('put return res=%j', data);
			return data;
		});
	};
	
	service.get = function(id) {
		console.log('service get post by id = %s', id);
		return $http.get(API + 'posts/' + id).then(function(res) {
			return res.data;
		});
	};
	
	service.deleteById = function(id) {
		return $http.delete(API + 'posts/' + id).then(function(res) {
			return res.data;
		});
	};

	service.sortPosts = function(){
		return _.sortBy(service.posts, 'id');
	};
	
	return service;
}]);