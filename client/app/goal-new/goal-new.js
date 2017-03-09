(function () {
  'use strict';

  angular
    .module('new', ['ui.materialize', '720kb.datepicker'])
    .controller('NewCtrl', function($scope, $http, authService, jwtHelper, lock, UserFactory, GoalFactory, BackerFactory, ProgressFactory) {

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

      vm.createDayRange = (goal) => {
        var range = [];
        var day = 1;
        var timeLeft = new Date(goal.due) - new Date(goal.start);
        var oneDay = 86400000;
        while (timeLeft > 0) {
          range.push('Day ' + day);
          day++;
          timeLeft -= oneDay;
        }
        return range;
      };

      vm.createDateRange = (goal) => {
        var range = [];
        var day = 1;
        var timeLeft = new Date(goal.due) - new Date(goal.start);
        var oneDay = 86400000;
        while (timeLeft > 0) {
          range.push(new Date(new Date(goal.start).valueOf() + (oneDay * (day - 1))).toDateString());
          day++;
          timeLeft -= oneDay;
        }
        return range;
      };

      vm.noteDisplayed = () => {
        vm.displayed = vm.goals.reduce(function(memo, goal) {
          if (goal.subsDisplayed) {
            return memo.concat([goal.id]);
          }
          return memo;
        }, []);
      };

      // Add the entered goal into the database
      vm.addGoal = function(id) {
        if(vm.quantity) {
          vm.goal = 'I will ' + vm.goal + ' at least ' + vm.number + ' ' + vm.units;
        }
        var myDate = new Date(Date.parse(vm.date) + 43100000);
        GoalFactory.createGoal(vm.goal, vm.payload.email, id, myDate, vm.number, vm.units)
          .then(function(goal) {
            vm.currentBackers.forEach(function(backer) {
              backer.GoalId = goal.data.id;
              BackerFactory.addBacker(backer)
                .then(function(backerX) {
                  BackerFactory.welcomeBacker(backerX)
                });
            });
            vm.currentBackers = [];
          });
        // Reset entry field
        vm.resetNewGoal();
      };

      vm.resetNewGoal = function() {
        vm.goal = '';
        vm.verb = '';
        vm.number = null;
        vm.date = null;
        vm.units = '';
        vm.quantity = false;
      };

      // Only show backer input field if someone wants to add a backer
      vm.showBackerInput = false;
      vm.atLeastOneBacker = false;
      var uniqueBackers = {};
      vm.addBacker = function() {
        vm.showBackerInput = true;
        vm.existingBackers = [];
        BackerFactory.getBackers(vm.user.id)
        .then(function(backers)  {
          var allBackers = backers.data;
          allBackers.forEach(function(current) {//create an object with unique backers
            uniqueBackers[current.backerEmail] = current;
          });
          for(var unique in uniqueBackers){
            vm.existingBackers.push(uniqueBackers[unique]);
          }
        });
      };

      // Submit backer's name and email
      vm.currentBackers = [];

      vm.deleteBacker = function(backer) {
        var spliced = vm.currentBackers.indexOf(backer);
        vm.currentBackers.splice(spliced, 1);
      };

      vm.deleteExistingBacker = function(backer) {
        //console.log('bacer in deleteExistingBacker ', backer);
        var spliced = vm.existingBackers.indexOf(backer);
        vm.existingBackers.splice(spliced, 1);
        BackerFactory.deleteBacker(backer.id);
      };

      vm.submitBacker = function(goal) {
        //submit vm.backerName and vm.backerEmail
        var newBacker = {};
        newBacker.name = vm.backerName;
        newBacker.email = vm.backerEmail;
        newBacker.UserId = vm.user.id;
        vm.currentBackers.push(newBacker);

        //Reset entry field
        vm.backerName = '';
        vm.backerEmail = '';
        vm.atLeastOneBacker = true;
        vm.showBackerInput = false;
        vm.showCollapsible = false;
      };

      vm.addExistingBacker = function(backer) {
        vm.backerName = backer.backerName;
        vm.backerEmail = backer.backerEmail;
        vm.submitBacker();
      };

      vm.toggleCollapsible = function() {
        vm.showCollapsible = !vm.showCollapsible;
      };

    });
})();
