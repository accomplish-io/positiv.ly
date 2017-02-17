angular.module('accomplish', [
  'dashboard',
  'new',
  'complete',
  'details',
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
  // TODO: add goal :id to route?
  .when('/complete', {
    templateUrl: 'goal-complete/goal-complete.html',
    controller: 'CompleteCtrl'
  })
  // TODO: add goal :id to route?
  .when('/details', {
    templateUrl: 'goal-details/goal-details.html',
    controller: 'DetailsCtrl'
  })
});