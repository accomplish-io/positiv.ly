(function () {
  'use strict';

  angular
    .module('dashboard', [])
    .controller('DashboardCtrl', function($scope, $http, authService, jwtHelper, lock, GoalFactory) {

    var vm = this;

    lock.getProfile(localStorage.getItem('id_token'), function (error, profile) {
      vm.payload = profile;
      GoalFactory.findOrCreateUser(vm.payload.name, vm.payload.email)
        .then(user => {
          vm.user = user.data[0]
        })
    });

    vm.test = () => console.log(vm.user);
  });
}());