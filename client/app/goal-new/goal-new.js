angular.module('new', [])
.controller('NewCtrl', function(GoalFactory, lock) {
  var vm = this;

  vm.goal = '';

  // lock.getProfile(localStorage.getItem('id_token'), function (error, profile) {
  //   vm.payload = profile;
  //   GoalFactory.findUser(vm.payload.email)
  //     .then(user => {
  //       vm.user = user.data;
  //     })
  // });

  lock.getProfile(localStorage.getItem('id_token'), function (error, profile) {
    vm.payload = profile;
    console.log(profile);
    GoalFactory.findOrCreateUser(vm.payload.name, vm.payload.email)
      .then(user => {
        vm.user = user.data[0]
      })
  });

  // console.log(GoalFactory.getUserGoals(vm.user.email));

  vm.addGoal = function() {
    GoalFactory.createGoal(vm.goal, vm.payload.email);
    vm.goal = '';
  }
});