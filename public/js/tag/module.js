'use strict';

angular.module('tag', ['tag.controllers','ui.router'])
.config(['$stateProvider', function($stateProvider) {
	$stateProvider.state('tags', {
		url : '/tags',
		templateUrl : '/views/tag/list.html',
		controller : 'TagCtrl',
		resolve: {
			tagPromise: ['tagService', function(tagService){
				return tagService.getAll();
			}]
		}
	})
	.state('tag-view', {
		url : '/tag/view/:id',
		templateUrl : '/views/tag/view.html',
		controller : 'TagViewCtrl',
		resolve : {
			tag : ['$stateParams', 'tagService',
			function($stateParams, tagService) {
				return tagService.get($stateParams.id);
			}]
		}
	})
	.state('tag-edit', {
		url : '/tag/edit/:id',
		templateUrl : '/views/tag/edit.html',
		controller : 'TagEditCtrl',
		resolve : {
			tag : ['$stateParams', 'tagService',
			function($stateParams, tagService) {
				return tagService.get($stateParams.id);
			}]
		}
	})
	.state('tag-add', {
		url : '/tag/add',
		templateUrl : '/views/tag/edit.html',
		controller : 'TagAddCtrl'
	});
}]);
