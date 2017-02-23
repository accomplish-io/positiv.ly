(function () {
  'use strict';

  angular
    .module('dashboard', ['ui.materialize', '720kb.datepicker'])
    .controller('DashboardCtrl', function($scope, $http, authService, jwtHelper, lock, GoalFactory) {

      var vm = this;

      // Get user details from auth
      lock.getProfile(localStorage.getItem('id_token'), function (error, profile) {
        vm.payload = profile;
        console.log('vm.payload ',vm.payload);
        GoalFactory.findOrCreateUser(vm.payload.name, vm.payload.email)
          .then(user => {
            vm.user = user.data[0]
          });
        // Get user goals and render on page
        GoalFactory.getUserGoals(vm.payload.email)
          .then(function(goals) {
            vm.prepGoals(goals);
            goals.data.forEach(goal => {
              goal.subsDisplayed = false;
            });
          });
      });

      vm.prepGoals = goals => {
        goals.data.forEach(goal => {
          if(goal.GoalId !== null) {
            goals.data.forEach(parent => {
              if (parent.id === goal.GoalId) {
                parent.hasChildren = true;
              }
            });
          }
          goal.addDisplayed = false;
        });
        vm.goals = goals.data;
      };

      // Open up sub-goals
      vm.toggleSubs = function (goal) {
        goal.subsDisplayed = !goal.subsDisplayed;
      };

      vm.toggleAdd = function (goal) {
        goal.addDisplayed = !goal.addDisplayed;
      };

      vm.deleteGoal = function(id) {
        GoalFactory.deleteGoal(id)
          .then(function() {
            GoalFactory.getUserGoals(vm.payload.email)
              .then(function(goals) {
                vm.prepGoals(goals);
              });
          });
      };

      // Add the entered goal into the database
      vm.addGoal = function(id) {
        GoalFactory.createGoal(vm.goal, vm.payload.email, id)
          .then(function() {
            GoalFactory.getUserGoals(vm.payload.email)
              .then(function(goals) {
                vm.prepGoals(goals);
              });
          });
        // Reset entry field
        vm.goal = '';
      };

      // Update goal completion status
      vm.updateCompleteGoal = function(goal) {
        goal.complete = !goal.complete;
        GoalFactory.updateGoal(goal.id, {complete: goal.complete})
          .then(function() {
            GoalFactory.getUserGoals(vm.payload.email)
              .then(function(goals) {
                vm.prepGoals(goals);
              });
          });
      };

  });
})();
