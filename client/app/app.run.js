(function () {

  'use strict';

  angular
    .module('app')
    .run(run);

  function run(authService, lock) {

    // Register the authentication listener that is
    // set up in auth.service.js
    authService.registerAuthenticationListener();

  }

})();
