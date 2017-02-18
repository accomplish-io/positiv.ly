angular.module('accomplish', [
  'dashboard',
  'auth',
  'new',
  'complete',
  'details',
  'ngRoute',
  'auth0.lock',
  'angular-jwt',
  'ui.router'
  ])
.config(config)

config.$inject = ['$stateProvider', 'lockProvider', '$urlRouterProvider'];


  function config($stateProvider, lockProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/home',
        controller: 'DashboardCtrl',
        templateUrl: './app/dashboard/dashboard.html',
        controllerAs: 'vm'
      })
      .state('auth', {
        url: '/auth',
        controller: 'AuthCtrl',
        templateUrl: './app/auth/auth.html',
        controllerAs: 'vm'
      })
      .when('/new', {
        url: '/new',
        controller: 'NewCtrl',
        templateUrl: './app/goal-new/goal-new.html',
        controllerAs: 'vm'
      })
  // TODO: add goal :id to route?
      .when('/complete', {
        url: '/auth',
        controller: 'CompleteCtrl',
        templateUrl: './app/goal-complete/goal-complete.html',
        controllerAs: 'vm'
      })
  // TODO: add goal :id to route?
      .when('/details', {
        url: '/auth',
        controller: 'DetailsCtrl',
        templateUrl: './app/goal-details/goal-details.html',
        controllerAs: 'vm'
      });

    lockProvider.init({
      clientID: 'AUTH0_CLIENT_ID',
      domain: 'AUTH0_DOMAIN'
    });

    $urlRouterProvider.otherwise('/home');
  }