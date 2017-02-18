angular.module('auth', [])
.controller('AuthCtrl', AuthCtrl);
AuthCtrl.$inject = ['authService'];

function AuthCtrl(authService) {
  var vm = this;
  vm.authService = authService;
}
