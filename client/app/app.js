angular.module('accomplish', [
  'dashboard',
  'newGoal',
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
    controller: 'NewGoalCtrl'
  })
});