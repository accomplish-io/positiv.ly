angular.module('accomplish', [
  'dashboard',
  'new',
  'complete',
  'ngRoute'
  ])
.config(function($routeProvider) {
  $routeProvider
  // TODO: add username :id to '/'?
  .when('/', {
    templateUrl: 'dashboard/dashboard.html',
    controller: 'DashboardCtrl'
  })
  .when('/new', {
    templateUrl: 'goal-new/goal-new.html',
    controller: 'NewCtrl'
  })
  .when('/complete', {
    templateUrl: 'goal-complete/goal-complete.html',
    controller: 'CompleteCtrl'
  })
});