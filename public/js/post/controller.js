'use strict';

angular.module('post.controllers', [ 'post.services'])
.controller('PostCtrl', ['$scope', 'postService',
function($scope, postService) {
	$scope.posts = postService.buffer;

	$scope.selectPost = function(row) {
		$scope.selectedRow = row;
	};
	
	$scope.deletePost = function(post, index) {
		//console.log('delete post by id='+ post._id);
		postService.deleteById(post._id);
		$scope.posts.splice(index, 1);
	};

	$scope.sortPost = function(){
		console.log('sorting post...');
		$scope.reverse = !$scope.reverse;
		//$scope.posts = postService.sortPosts();
	};
}])
.controller('PostAddCtrl', ['$scope','$state', 'postService', function($scope, $state, postService) {
	$scope.tags = postService.tags;
	
	//console.log('tags= %j', tags);
	$scope.savePost = function() {
		if (!$scope.post.title || $scope.post.title === '') {
			return;
		}
		if (!$scope.post.id || $scope.post.id === '') {
			return;
		}
		
		postService.create({
			id:$scope.post.id,
			tag:$scope.post.tag,
			title : $scope.post.title,
			content : $scope.post.content
		});
		$scope.post.id = '';
		$scope.post.title = '';
		$scope.post.content = '';
		
		$state.go('posts');
	};
}])
.controller('PostViewCtrl', ['$scope', 'post', function($scope,post) {
	$scope.post = post;
	$scope.markdown_content = post.content;
}])
.controller('PostEditCtrl', ['$scope', '$state', 'post', 'postService', function($scope, $state,post, postService) {
	$scope.post = post;
	$scope.tags = postService.tags;
	
	$scope.savePost = function() {
		if (!$scope.post.title || $scope.post.title === '') {
			return;
		}
		if (!$scope.post.id || $scope.post.id === '') {
			return;
		}
		
		postService.update({
			id:$scope.post.id,
			tag:$scope.post.tag,
			title : $scope.post.title,
			content : $scope.post.content
		}, post._id);
		// $scope.post.id = '';
		// $scope.post.title = '';
		// $scope.post.content = '';
		
		//$state.go('posts');
	};
}]);