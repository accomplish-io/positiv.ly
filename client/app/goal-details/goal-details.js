angular.module('details', [])
.controller('DetailsCtrl', function($scope, authService) {
  var vm = this;
  vm.authService = authService;
});