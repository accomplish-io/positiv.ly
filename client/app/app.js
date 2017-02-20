angular.module('app', [
  'dashboard',
  'auth',
  'new',
  'complete',
  'details',
  'auth0.lock',
  'angular-jwt',
  'ui.router',
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
      .state('/new', {
        url: '/new',
        controller: 'NewCtrl',
        templateUrl: './app/goal-new/goal-new.html',
        controllerAs: 'vm'
      })
  // TODO: add goal :id to route?
      .state('/complete', {
        url: '/auth',
        controller: 'CompleteCtrl',
        templateUrl: './app/goal-complete/goal-complete.html',
        controllerAs: 'vm'
      })
  // TODO: add goal :id to route?
      .state('/details', {
        url: '/auth',
        controller: 'DetailsCtrl',
        templateUrl: './app/goal-details/goal-details.html',
        controllerAs: 'vm'
      });

    lockProvider.init({
      clientID: AUTH0_CLIENT_ID,
      domain: AUTH0_DOMAIN
    });

     jwtOptionsProvider.config({
      tokenGetter: ['options', function (options) {
        if (options && options.url.substr(options.url.length - 5) == '.html') {
          return null;
        }
        return localStorage.getItem('id_token');
      }],
      whiteListedDomains: ['localhost'],
      unauthenticatedRedirectPath: '/auth'
    });

    $urlRouterProvider.otherwise('/home');
  }
