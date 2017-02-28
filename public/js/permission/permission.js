'use strict';

angular.module('permission', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
	$stateProvider.state('permissions', {
		url : '/permissions',
		templateUrl : '/views/permission/list.html',
		data:{
			requireLogin: false
		},
		controller : 'permissionCtrl',
		resolve: {
			permissionPromise: ['permissionService', function(permissionService){
				return permissionService.getAll();
			}]
		}
	})
	.state('permission-edit', {
		url : '/permission/:id/edit',
		templateUrl : '/views/permission/edit.html',
		controller : 'permissionEditCtrl',
		resolve : {
			permission : ['$stateParams', 'permissionService',
			function($stateParams, permissionService) {
				return permissionService.get($stateParams.id);
			}]
		}
	})
	.state('permission-add', {
		url : '/permission/add',
		templateUrl : '/views/permission/edit.html',
		controller : 'permissionAddCtrl',
		resolve: {
			permissionPromise: ['permissionService', function(permissionService){
				return permissionService.getRoles();
			}]
		}
	});


}])
.factory('permissionService', PermissionService)
.controller('permissionCtrl', PermissionCtrl)
.controller('permissionAddCtrl', PermissionAddCtrl)
.controller('permissionEditCtrl', PermissionEditCtrl);

PermissionService.$inject = ['$http', 'API'];

function PermissionService($http, API){
	var service = {
		name : 'permission',
		permissions : [],
		roles : []
	};
	
	service.getAll = function() {
		return $http.get(API + 'permission')
		.success(function(data) {
			angular.copy(data, service.permissions);
		});
	};

	service.getRoles = function() {
		return $http.get(API + 'role')
		.success(function(data) {
			angular.copy(data, service.roles);
		});
	};

	service.create = function(permission) {
		return $http.post(API + service.name, permission).success(function(data){
			service.permissions.push(data);
		});
	};
	
	service.update = function(permission) {
		console.log('service put permission by id = %s', permission.id);
		return $http.put(API + service.name + '/' + permission.id, permission).success(function(data){
			//service.permissions.push(data);
			console.log('permission[PUT] returns data=%j', data);
			return data;
		});
	};
	
	service.get = function(id) {
		console.log('service get permission by id = %s', id);
		return $http.get(API + service.name + '/' + id).then(function(res) {
			return res.data;
		});
	};
	
	service.deleteById = function(id) {
		return $http.delete(API + service.name + '/' + id).then(function(res) {
			return res.data;
		});
	};

	return service;
}

PermissionCtrl.$inject = ['$scope','permissionService'];

function PermissionCtrl($scope,permissionService){
	//var vm = this;
	$scope.permissions = permissionService.permissions;

	$scope.selectPermission = function(row) {
		$scope.selectedRow = row;
	};
	
	$scope.deletePermission = function(permission, index) {
		console.log('[PermissionCtrl] delete permission by id='+ permission._id);
		permissionService.deleteById(permission._id);
		$scope.permissions.splice(index, 1);
	};
}

PermissionAddCtrl.$inject = ['$scope','$state','permissionService'];

function PermissionAddCtrl($scope, $state, permissionService){
	$scope.isEdit = false;
	$scope.roles = permissionService.roles;
	
	//console.log('tags= %j', tags);
	$scope.savePermission = function() {
		
		console.log('service get permission, slug = %s', this.permission.slug);
		console.log('service get permission, roles = %s', this.permission.roles.toString());
		permissionService.create({
			slug: this.permission.slug,
			url:this.permission.url,
			//action: this.permission.action,
			roles: this.permission.roles,
			description: this.permission.description
		});

		
		$state.go('permissions');
	};

	// $scope.savePermission = function(){
	// 	console.log('calling PermissionAddCtrl.savePermission()');
	// 	permissionService.create({
	// 		name: this.permission.name,
	// 		description: this.permission.description
	// 	});
	// 	$state.go('permissions');
	// }

}

PermissionEditCtrl.$inject =['$scope', '$state', 'permissionService', 'permission'];

function PermissionEditCtrl($scope,$state,permissionService, permission) {
	$scope.permission = permission;
	$scope.isEdit = true;
	
	$scope.savePermission = function(){
		console.log('calling PermissionEditCtrl.savePermission()');
		permissionService.update({
			id:this.permission._id,
			slug: this.permission.slug,
			url:this.permission.url,
			//action: this.permission.action,
			roles: this.permission.roles,
			description: this.permission.description
		});
		$state.go('permissions');
	}	
}

