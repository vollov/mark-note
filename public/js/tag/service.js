'use strict';

angular.module('tag.services', [])
.factory('tagService', [ '$http', 'API', '_', function($http, API, _) {

	var service = {
			tags : [],
      buffer : [],
	};

	service.getAll = function() {
		return $http.get(API + 'tags')
		.success(function(data) {
			angular.copy(data, service.tags);
			angular.copy(data, service.buffer);
		});
	};

	service.create = function(tag) {
		return $http.post(API + 'tags', tag).success(function(data){
			service.tags.push(data);
		});
	};

	service.update = function(tag, id) {
		console.log('service put tag by id = %s', id);
		return $http.put(API + 'tags/' + id, tag).success(function(data){
			// update returned tag in service.tags
			console.log('put return res=%j', data);
      var tags = _.reject(service.tags, function(item){
        return item._id==data._id;
      });

      tags.push(data);
      service.tags = tags;
		});
	};

	service.get = function(id) {
		console.log('service get tag by id = %s', id);
		return $http.get(API + 'tags/' + id).then(function(res) {
			return res.data;
		});
	};

	service.deleteById = function(id) {
    return $http.delete(API + 'tags/' + id);
	};

	service.sortTags = function(){
		return _.sortBy(service.tags, 'name');
	};

	return service;
}]);
