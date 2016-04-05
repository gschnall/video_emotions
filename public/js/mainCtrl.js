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
    console.log('handling')
    var token = res.data ? res.data.token : null;
    if (token){
      //auth.saveToken(token);
    };
    self.message = res.data.message;
  }

  self.login = function(){
    user.login(self.name, self.password)
    .then(handleRequest, handleRequest)
  }

  self.logout = function(){
    $window.localStorage.removeItem('jwtToken')
  }

  self.isAuthed = function(){
    console.log($window.localStorage['jwtToken'] )
    return $window.localStorage['jwtToken'] 
  }
    
  self.title = "VideoController"
}

  // AUTHENTICATION
  function userService($http){
    var self = this;

    //return promise that hits auth route and passes object as data
    self.login = function(name, password){
      return $http.post('auth/', {
        name: name,
        password: password
      })
    }
  }

  authService.$inject = ['$window']

  function authService($window){
    var self = this;

    self.saveToken = function(token){
      $window.localStorage['jwtToken'] = token;
      console.log(token)
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
