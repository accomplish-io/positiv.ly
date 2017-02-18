angular.module('new', [])
.controller('NewCtrl', function() {
  var vm = this;

  vm.goal = '';

  vm.addGoal = function() {
    console.log(vm.goal);
    vm.goal = '';
  }
});