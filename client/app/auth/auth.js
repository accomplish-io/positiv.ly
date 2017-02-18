angular.module('auth', [])
.controller('AuthCtrl', function(authService){
  var vm = this;
  vm.authService = authService;
});
