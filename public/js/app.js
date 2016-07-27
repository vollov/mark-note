'use strict';

angular.module('markNote', ['ui.router','hc.marked', 'post'])
.constant('API', '/api/v1.0/')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$stateProvider.state('posts', {
		url : '/posts',
		templateUrl : '/views/post/list.html',
		controller : 'PostCtrl',
		resolve: {
			postPromise: ['postService', function(postService){
				return postService.getAll();
			}]
		}
	})
	.state('post-view', {
		url : '/post/view/:id',
		templateUrl : '/views/post/view.html',
		controller : 'PostViewCtrl',
		resolve : {
			post : ['$stateParams', 'postService',
			function($stateParams, postService) {
				return postService.get($stateParams.id);
			}]
		}
	})
	.state('post-edit', {
		url : '/post/edit/:id',
		templateUrl : '/views/post/edit.html',
		controller : 'PostEditCtrl',
		resolve : {
			post : ['$stateParams', 'postService',
			function($stateParams, postService) {
				return postService.get($stateParams.id);
			}]
		}
	})
	.state('post-add', {
		url : '/post/add',
		templateUrl : '/views/post/edit.html',
		controller : 'PostAddCtrl'
	});
	
	$urlRouterProvider.otherwise('posts');
}]);