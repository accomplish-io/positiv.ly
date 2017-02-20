angular.module('new', [])
.controller('NewCtrl', function(GoalFactory, lock) {
  var vm = this;

  vm.goal = '';

  lock.getProfile(localStorage.getItem('id_token'), function (error, profile) {
    vm.payload = profile;
    GoalFactory.findUser(vm.payload.email)
      .then(user => {
        vm.user = user.data;
      })
  });

  vm.addGoal = function() {
    GoalFactory.createGoal(vm.goal, vm.payload.email);
    vm.goal = '';
  }
});