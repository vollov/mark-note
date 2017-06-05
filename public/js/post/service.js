'use strict';

angular.module('post.services', [])
.factory('postService', [ '$http', 'API', '_', function($http, API, _) {

	var service = {
			posts : [],
			buffer : [],
			tags : []
	};

	service.getAll = function() {
		return $http.get(API + 'posts')
		.success(function(data) {
			angular.copy(data, service.posts);
			angular.copy(data, service.buffer);
		});
	};

	service.find = function(tag) {
		console.log('service find posts by tag = %s', tag);
		// filter out data and return
		var data = _.filter(service.posts, function(item){
			//  ["moe", "larry", "curly"]
			// var tags_names = _.pluck(item.tags, 'name') ;
			// console.log('find tags_names=%j',tags_names);
			//
			// if(_.contains(tags_names, tag)){
			// 	return true;
			// }
			// return false;

			//for single tag match
			if(item.tag.name == tag){
				console.log('iter item tag.name=' + item.tag.name);
				return true;
			}
			return false;
		});
		// data = _.sortBy(data, function(item){
		// 	return item.id;
		// });

		console.log('sorted data =%j',data);

		angular.copy(data, service.buffer);

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
		console.log('sorting posts');
		return _.sortBy(service.posts, 'id');
	};

	return service;
}]);
