'use strict';

angular.module('post.controllers', [ 'post.services'])
.controller('PostCtrl', ['$scope', 'postService',
function($scope, postService) {
	$scope.posts = postService.posts;

	$scope.selectPost = function(row) {
		$scope.selectedRow = row;
	};
	
	$scope.deletePost = function(post, index) {
		//console.log('delete post by id='+ post._id);
		postService.deleteById(post._id);
		$scope.posts.splice(index, 1);
	};
}])
.controller('PostAddCtrl', ['$scope','$state', 'postService', function($scope, $state, postService) {

	//console.log('tags= %j', tags);
	$scope.savePost = function() {
		if (!$scope.title || $scope.title === '') {
			return;
		}
		
		postService.create({
			title : $scope.title,
			content : $scope.content
		});
		$scope.title = '';
		$scope.content = '';
		
		$state.go('posts');
	};
}])
.controller('PostViewCtrl', ['$scope', 'post', function($scope,post) {
	$scope.post = post;
	$scope.markdown_content = post.content;
}])
.controller('PostEditCtrl', ['$scope', 'post', 'postService', function($scope,post, postService) {
	$scope.post = post;

	$scope.savePost = function() {
		if (!$scope.title || $scope.title === '') {
			return;
		}
		
		postService.update({
			id : $scope.id,
			title : $scope.title,
			content : $scope.content
		});
		$scope.title = '';
		$scope.content = '';
		$scope.id = '';
		
		$state.go('posts');
	};
}]);