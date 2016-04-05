(function(){

angular.module('videoEmotions')
  .factory('authInterceptor', authInterceptor)
  .service('user', userService)
  .service('auth', authService)
  .config(function($httpProvider){
    $httpProvider.interceptors.push('authInterceptor')
  })
  .controller('VideoController', VideoController)

VideoController.$inject = ["videoService", '$state', 'user', 'auth', '$window']

function VideoController(videoService, $state, user, auth, $window){
  var self = this;


  // AUTHORIZATION
  function handleRequest(res){
    VideoController.userEmail = res.config.data.email
    $window.localStorage['email'] = res.config.data.email 
    var token = res.data ? res.data.token : null;
    if (token){
      //auth.saveToken(token);
    };
    self.message = res.data.message;
  }

  self.login = function(){
    user.login(self.email, self.password)
    .then(handleRequest, handleRequest)
  }

  self.logout = function(){
    $window.localStorage.removeItem('jwtToken')
    $window.localStorage.removeItem('email')
    VideoController.userEmail = null
  }

  self.isAuthed = function(){
    return $window.localStorage['jwtToken'] 
  }
  self.title = "VideoController";

  // WE MUST PROTECT THIS HOU...THE OTHER STATES
  if(!self.isAuthed() && $state.current.name != "signup"){
    $state.go('login')
  }

  videoService.index().success(function(results){
    console.log(results)
    self.videos = results.videos
  })

  self.createVideo = function(data){
    self.create(data).success(function(results){
      console.log(results)
      self.video = results.video
      $state.go('video')
    })
  }
}

  // AUTHENTICATION
  function userService($http){
    var vm = this;

    //return promise that hits auth route and passes object as data
    vm.login = function(email, password){
      return $http.post('auth/', {
        email: email,
        password: password
      })
    }
  }

  authService.$inject = ['$window']

  function authService($window){
    var vm = this;

    vm.saveToken = function(token){
      $window.localStorage['jwtToken'] = token;
    }
  }

  function authInterceptor(auth){
    return {
      response: function(res){
        if(res.data.token){
          auth.saveToken(res.data.token)
        }
        return res;
      }
    }
  }
  
})()
