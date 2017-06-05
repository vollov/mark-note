'use strict';

angular.module('role', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
	$stateProvider.state('roles', {
		url : '/roles',
		templateUrl : '/views/role/list.html',
		data:{
			requireLogin: false
		},
		controller : 'roleCtrl',
		resolve: {
			rolePromise: ['roleService', function(roleService){
				return roleService.getAll();
			}]
		}
	})
	// .state('role-edit', {
	// 	url : '/role/edit/:id',
	// 	templateUrl : '/views/role/edit.html',
	// 	controller : 'RoleEditCtrl',
	// 	resolve : {
	// 		post : ['$stateParams', 'postService',
	// 		function($stateParams, postService) {
	// 			return postService.get($stateParams.id);
	// 		}]
	// 	}
	// })
	.state('role-add', {
		url : '/role/add',
		templateUrl : '/views/role/edit.html',
		controller : 'roleAddCtrl'
	});


}])
.factory('roleService', RoleService)
.controller('roleCtrl', RoleCtrl)
.controller('roleAddCtrl', RoleAddCtrl);

RoleService.$inject = ['$http', 'API'];

function RoleService($http, API){
	var service = {
		name : 'role',
		roles : []
	};
	
	service.getAll = function() {
		return $http.get(API + 'role')
		.success(function(data) {
			angular.copy(data, service.roles);
		});
	};

	service.create = function(role) {
		return $http.post(API + service.name, role).success(function(data){
			service.roles.push(data);
		});
	};
	
	service.update = function(role, id) {
		console.log('service put role by id = %s', id);
		return $http.put(API + service.name + '/' + id, role).success(function(data){
			//service.roles.push(data);
			console.log('role[PUT] returns data=%j', data);
			return data;
		});
	};
	
	service.get = function(id) {
		console.log('service get role by id = %s', id);
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

RoleCtrl.$inject = ['$scope','roleService'];

function RoleCtrl($scope,roleService){
	//var vm = this;
	$scope.roles = roleService.roles;

	$scope.selectRole = function(row) {
		$scope.selectedRow = row;
	};
	
	$scope.deleteRole = function(role, index) {
		//console.log('delete post by id='+ post._id);
		roleService.deleteById(role.id);
		$scope.roles.splice(index, 1);
	};
}

RoleAddCtrl.$inject = ['$scope','$state','roleService'];

function RoleAddCtrl($scope, $state, roleService){

	$scope.saveRole = function(){
		console.log('calling RoleAddCtrl.saveRole()');
		roleService.create({
			name: this.role.name,
			description: this.role.description
		});
		$state.go('roles');
	}

}
