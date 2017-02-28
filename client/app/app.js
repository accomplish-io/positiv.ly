angular.module('app', [
  'dashboard',
  'auth',
  'new',
  'complete',
  'details',
  'auth0.lock',
  'angular-jwt',
  'ui.router',
  'chart.js'
])
.config(config);

config.$inject = ['$stateProvider', 'lockProvider', '$urlRouterProvider', 'jwtOptionsProvider'];

function config($stateProvider, lockProvider, $urlRouterProvider, jwtOptionsProvider) {

  $stateProvider
    .state('auth', {
      url: '/auth',
      controller: 'AuthCtrl',
      templateUrl: './app/auth/auth.html',
      controllerAs: 'vm'
    })
    .state('home', {
      url: '/home',
      controller: 'DashboardCtrl',
      templateUrl: './app/dashboard/dashboard.html',
      controllerAs: 'vm',
      authenticate: true
    })
    /*
    .state('new', {
      url: '/new',
      controller: 'NewCtrl',
      templateUrl: './app/goal-new/goal-new.html',
      controllerAs: 'vm'
    })
    .state('complete', {
      url: '/auth',
      controller: 'CompleteCtrl',
      templateUrl: './app/goal-complete/goal-complete.html',
      controllerAs: 'vm'
    })
    .state('details', {
      url: '/auth',
      controller: 'DetailsCtrl',
      templateUrl: './app/goal-details/goal-details.html',
      controllerAs: 'vm'
    });
*/
  lockProvider.init({
    clientID: AUTH0_CLIENT_ID,
    domain: AUTH0_DOMAIN,
    loginState: 'auth'
  });

  $urlRouterProvider.otherwise('/home');
};
