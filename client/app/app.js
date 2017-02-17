angular.module('accomplish', [
  'dashboard',
  'ngRoute'
  ])
.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'dashboard/dashboard.html',
    controller: 'DashboardCtrl'
  })
});