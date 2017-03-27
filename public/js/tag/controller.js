'use strict';

angular.module('tag.controllers', [ 'tag.services'])
.controller('TagCtrl', ['$scope', 'tagService', '_',
function($scope, tagService, _) {
	$scope.tags = tagService.tags;
  $scope.action = 'create';
  $scope.tag = null;

	$scope.selectTag = function(row) {
		$scope.selectedRow = row;
    // fill edit form
	};

  $scope.editTag = function(tag){
    console.log('clicked edit tag by id='+ tag._id);
    $scope.action = 'edit';
    $scope.tag = tag;
  };


  $scope.saveTag = function() {
		if (!$scope.tag.name || $scope.tag.name === '') {
			return;
		}

    if($scope.action == 'create'){
      console.log('clicked save tag action='+ $scope.action);
      tagService.create({
  			name:$scope.tag.name,
  		});
    } else {
      tagService.update({
  			name : $scope.tag.name
  		}, $scope.tag._id);
    };
    $scope.tag = null;
    $scope.action = 'create';
    $scope.tags = tagService.tags;
    // splice = add item
    //$scope.tags.splice(index, 1);
	};

	$scope.deleteTag = function(tag, index) {
    tagService.deleteById(tag._id).then(getSuccessFn, getErrorFn);

		function getSuccessFn(data, status, headers, config) {
			var result = data.data;
      console.log('delete tag returned result = %j, id =%s', result, tag._id);

      var tags = _.reject(tagService.tags, function(item){
        return tag._id==item._id;
      });
      tagService.tags = tags;
      $scope.tags = tagService.tags;
		}

		function getErrorFn(data, status, headers, config) {
			//TODO show 500 page
			console.error('delete tag get service failure!');
		}
	};

	$scope.sortTag = function(){
		console.log('sorting tag...');
		$scope.reverse = !$scope.reverse;
		//$scope.tags = tagService.sortTags();
	};
}])
.controller('TagAddCtrl', ['$scope','$state', 'tagService', function($scope, $state, tagService) {
	$scope.tags = tagService.tags;

	$scope.saveTag = function() {
		if (!$scope.tag.name || $scope.tag.name === '') {
			return;
		}
		if (!$scope.tag.id || $scope.tag.id === '') {
			return;
		}

		tagService.create({
			name:$scope.tag.name,
		});
		$scope.tag.name = '';

		$state.go('tags');
	};
}])
.controller('TagViewCtrl', ['$scope', 'tag', function($scope,tag) {
	$scope.tag = tag;
}])
.controller('TagEditCtrl', ['$scope', '$state', 'tag', 'tagService', function($scope, $state,tag, tagService) {
	$scope.tag = tag;
	$scope.tags = tagService.tags;

	$scope.saveTag = function() {
		if (!$scope.tag.name || $scope.tag.name === '') {
			return;
		}
		if (!$scope.tag.id || $scope.tag.id === '') {
			return;
		}

		tagService.update({
			name : $scope.tag.name
		}, tag._id);
	};
}]);
