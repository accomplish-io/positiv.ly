(function () {
  'use strict';

  angular
    .module('dashboard', ['ui.materialize'])
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
          .then(goals => {
            goals.data.forEach(goal =>{
              goal.subsDisplayed = true;
            });
            vm.goals = goals.data;
          });
      });

      // Open up sub-goals
      vm.toggleSubs = function (goal) {
        console.log('fire');
        console.log(goal);
        for (var i = 0; i < vm.goals.length; i++){
          if (vm.goals[i].id === goal.id) {
            console.log(vm.goals[i]);
            vm.goals[i].subsDisplayed = !vm.goals[i].subsDisplayed;
            console.log(vm.goals[i]);
            return;
          }
        }
      };
      // Not currently working
      vm.toggleSubs = vm.toggleSubs.bind(this);

      // Add the entered goal into the database
      vm.addGoal = function() {
        GoalFactory.createGoal(vm.goal, vm.payload.email)
          .then(function() {
            GoalFactory.getUserGoals(vm.payload.email)
              .then(goals => {
                vm.goals = goals.data;
              });
          });
        // Reset entry field
        vm.goal = '';
      };

      // Update goal completion status
      vm.completeGoal = function(goal) {
        GoalFactory.updateGoal(goal.id, {complete: true})
          .then(function() {
            GoalFactory.getUserGoals(vm.payload.email)
              .then(goals => {
                vm.goals = goals.data;
              });
          });
      };

  });
})();

