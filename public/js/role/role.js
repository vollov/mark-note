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
	.state('role-edit', {
		url : '/role/:id/edit',
		templateUrl : '/views/role/edit.html',
		controller : 'roleEditCtrl',
		resolve : {
			role : ['$stateParams', 'roleService',
			function($stateParams, roleService) {
				return roleService.get($stateParams.id);
			}]
		}
	})
	.state('role-add', {
		url : '/role/add',
		templateUrl : '/views/role/edit.html',
		controller : 'roleAddCtrl'
	});


}])
.factory('roleService', RoleService)
.controller('roleCtrl', RoleCtrl)
.controller('roleAddCtrl', RoleAddCtrl)
.controller('roleEditCtrl', RoleEditCtrl);

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
	
	service.update = function(role) {
		console.log('service put role by id = %s', role.id);
		return $http.put(API + service.name + '/' + role.id, role).success(function(data){
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
		console.log('delete by id=' + id);
		
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
		console.log('[RoleCtrl] delete role by id='+ role._id);
		roleService.deleteById(role._id);
		$scope.roles.splice(index, 1);
	};
}

RoleAddCtrl.$inject = ['$scope','$state','roleService'];

function RoleAddCtrl($scope, $state, roleService){
	$scope.isEdit = false;
	
	$scope.saveRole = function(){
		console.log('calling RoleAddCtrl.saveRole()');
		roleService.create({
			name: this.role.name,
			description: this.role.description
		});
		$state.go('roles');
	}

}

RoleEditCtrl.$inject =['$scope', '$state', 'roleService', 'role'];

function RoleEditCtrl($scope,$state,roleService, role) {
	$scope.role = role;
	$scope.isEdit = true;
	
	$scope.saveRole = function(){
		console.log('calling RoleEditCtrl.saveRole()');
		roleService.update({
			id:this.role._id,
			name: this.role.name,
			description: this.role.description
		});
		$state.go('roles');
	}	
}

