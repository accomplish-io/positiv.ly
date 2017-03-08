'use strict';

(function () {
  'use strict';

  angular
    .module('app')
    .factory('BackerFactory', BackerFactory);

  function BackerFactory($http) {

    var addBacker = function addBacker(backer) {
      return $http({
        method: 'POST',
        url: 'api/backers',
        data: backer
      });
    };

    var getBackers = function getBackers(userId) {
      return $http({
        method: 'GET',
        url: 'api/backers/' + userId
      });
    };

    var deleteBacker = function deleteBacker(backerId) {
      return $http({
        method: 'DELETE',
        url: 'api/backers/' + backerId
      });
    };

    var welcomeBacker = function (backer) {
      return $http({
        method: 'POST',
        url: 'api/backers/email',
        data: backer
      });
    }

    return {
      addBacker: addBacker,
      getBackers: getBackers,
      deleteBacker: deleteBacker,
      welcomeBacker: welcomeBacker
    };
  };
})();
