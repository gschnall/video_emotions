(function(){

angular.module('videoEmotions', ['ui.router'])
  .config(['$stateProvider', '$urlRouterProvider', mainRouter])
//   .config(function ($httpProvider) {
//   $httpProvider.defaults.headers.common = {};
//   $httpProvider.defaults.headers.post = {};
//   $httpProvider.defaults.headers.put = {};
//   $httpProvider.defaults.headers.patch = {};
// });

  function mainRouter($stateProvider, $urlRouterProvider){
    // handle attempt to other routes
    $urlRouterProvider.otherwise('/')

    // states/routes
    $stateProvider
      .state('login', {
        url: '/',
        templateUrl: 'public/partials/login.html',
        controller: 'VideoController as video'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'public/partials/signup.html',
        controller: 'VideoController as video'
      })
      .state('create', {
        url: '/create',
        templateUrl: 'public/partials/create.html',
        controller: 'VideoController as video'
      })
      .state('library', {
        url: '/library',
        templateUrl: 'public/partials/library.html',
        controller: 'VideoController as video'
      })
      .state('video', {
        url: '/video',
        templateUrl: 'public/partials/video.html',
        controller: 'VideoController as video'
      })
  }


})()
