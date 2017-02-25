(function () {
  'use strict';

  angular
    .module('dashboard', ['ui.materialize', '720kb.datepicker'])
    .controller('DashboardCtrl', function($scope, $http, authService, jwtHelper, lock, GoalFactory) {

      var vm = this;
      vm.quantity = false;
      vm.test = "blank";
      // Get user details from auth
      lock.getProfile(localStorage.getItem('id_token'), function (error, profile) {
        vm.payload = profile;
        vm.progNum = 0;
        vm.goals = [];
        vm.quantity = false;
        vm.number = null;
        vm.unit = "";
        GoalFactory.findOrCreateUser(vm.payload.name, vm.payload.email)
          .then(user => {
            vm.user = user.data[0];
            vm.renderGoals();
          });

        // Get user goals and render on page
      });

      vm.renderGoals = () => {
        vm.noteDisplayed();
        GoalFactory.getUserGoals(vm.payload.email)
          .then(goals => {
            goals.data.forEach((goal, index, goalsArr) => {
              goal.subsDisplayed = false;
              goal.addDisplayed = false;
              if(goal.GoalId !== null) {
                goals.data.forEach(parent => {
                  if (parent.id === goal.GoalId) {
                    parent.hasChildren = true;
                  }
                });
              }
              goal.progress = [[goal.number ? ((goal.Progresses.reduce(function(prev, next, index, progArr) {
                return angular.isNumber(next.number) ? prev + next.number : prev;
              }, 0)) / goal.number) * 100 : 70],
              [goal.due ? ((new Date() - new Date(goal.start)) / (new Date(goal.due) - new Date(goal.start))) * 100 : 50]];
            });
            vm.goals = goals.data;
            vm.restoreDisplayed();
            console.log(vm.goals);
          });
      };

      vm.noteDisplayed = () => {
        vm.displayed = vm.goals.reduce(function(memo, goal) {
          if (goal.subsDisplayed) {
            return memo.concat([goal.id]);
          }
          return memo;
        }, []);
      };

      vm.restoreDisplayed = () => {
        vm.goals.forEach(function(goal) {
          if (vm.displayed.includes(goal.id)) {
            goal.subsDisplayed = true;
          }
        });
      }

      // vm.data = [
      //   [65],
      //   [28]
      // ];

      vm.labels = ['Progress'];
      vm.series = ['Actual Progress', 'Expected Progress'];

      vm.options = {
        scales: {
          yAxes: [{display: true}],
          xAxes: [
            {
              display: true,
              ticks: {
                beginAtZero: true,
                max: 100
              },
              gridLines: {display: false}
            }
          ],
        }
      };

      // Open up sub-goals
      vm.toggleSubs = function (goal) {
        goal.subsDisplayed = !goal.subsDisplayed;
      };

      vm.toggleAdd = function (goal) {
        goal.addDisplayed = !goal.addDisplayed;
      };

      vm.addProgress = function (goal) {
        GoalFactory.postProgress(vm.goal.id, vm.progNum)
          .then(function() {
            vm.renderGoals();
            vm.number = null;
            vm.unit = "";
          });
      };

      vm.deleteGoal = function(id) {
        GoalFactory.deleteGoal(id)
          .then(function() {
            vm.renderGoals();
          });
      };

      // Add the entered goal into the database
      vm.addGoal = function(id) {
        GoalFactory.createGoal(vm.goal, vm.payload.email, id, vm.date, vm.number, vm.units)
          .then(function() {
            vm.renderGoals()
          });
        // Reset entry field
        vm.goal = '';
        vm.verb = '';
        vm.number = null;
        vm.date = null;
        vm.units = '';
      };

      // Update goal completion status
      vm.updateCompleteGoal = function(goal) {
        goal.complete = !goal.complete;
        GoalFactory.updateGoal(goal.id, {complete: goal.complete})
          .then(function() {
            vm.renderGoals();
          });
      };

    });
})();
