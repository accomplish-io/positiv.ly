//about.js

(function () {
  'use strict';

  angular
    .module('about', ['ui.materialize', '720kb.datepicker'])
    .controller('AboutCtrl', function($scope, $http, authService, jwtHelper, lock, UserFactory, GoalFactory, BackerFactory, ProgressFactory) {

      var vm = this;
      vm.quantity = false;
      vm.goals = [];
      vm.quantity = false;
      vm.number = null;
      vm.unit = '';
      vm.existingBackers = [];
      vm.showCollapsible = false;

      // Get user details from auth
      vm.displayLoginButton = () =>
      localStorage.getItem('id_token') ? false : true;

      lock.getProfile(localStorage.getItem('id_token'), function (error, profile) {
        vm.payload = profile;
        UserFactory.findOrCreateUser(vm.payload.name, vm.payload.email)
          .then(user => {
            vm.user = user.data[0];
          });
      });
 });
})();
