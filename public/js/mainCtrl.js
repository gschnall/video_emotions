(function(){

angular.module('videoEmotions')
  .factory('authInterceptor', authInterceptor)
  .service('user', userService)
  .service('auth', authService)
  .config(function($httpProvider){
     $httpProvider.interceptors.push('authInterceptor')
  })
  .controller('VideoController', VideoController)

VideoController.$inject = ["videoService", '$state', 'user', 'auth', '$window', '$http']

function VideoController(videoService, $state, user, auth, $window, $http){
  var self = this;
  //if(!self.currentVideo){ self.currentVideo = {} }
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

  self.signup = function(){
    userService.signup(self.name, self.email, self.password)
    .then(handleRequest, handleRequest)
  }

  self.login = function(){
    user.login(self.email, self.password)
    .then(handleRequest, handleRequest)
  }

  self.logout = function(){
    $window.localStorage.removeItem('jwtToken')
    $window.localStorage.removeItem('email')
    $window.localStorage.removeItem('currentVideo')
    VideoController.userEmail = null
  }

  self.isAuthed = function(){
    return $window.localStorage['jwtToken']
  }
  self.title = "VideoController";
  self.userEmail = $window.localStorage['email'] || null

  // WE MUST PROTECT THIS HOU...THE OTHER STATES
  if(!self.isAuthed() && $state.current.name != "signup"){
    $state.go('login')
  }

  self.createVideo = function(data){
    self.create(data).success(function(results){
      console.log(results)
      self.video = results.video
      $state.go('video')
    })
  }
  self.currentVideo = user.currentVideo || null
  self.view = function(video){
    user.currentVideo = video
    console.log(user)
    $state.go('video')
  }

  self.destroy = function(id){
    videoService.destroy(id).success(function(results){
      console.log(results)
      getVideos()
    })
  }

  self.analyze = function(video){
    var arr = []
    console.log(video.videoUrl)
    videoService.analyze({"url": video.videoUrl}).then(function(results){
      arr.push(results)
      videoService.reAnalyze({"url": video.videoUrl}).then(function(imageData){
        arr.push(imageData)
        console.log(imageData)
        $http({
            url: '/videos/' + video._id,
            method: "POST",
            data: { 'data' : arr }
          }).then(function(err, data){
            if(err) {console.log(err); getVideos()}
            console.log('ok');
            getVideos()
        })
      })
     })
    }

    function getVideos(){
      videoService.index().success(function(results){
      console.log(results)
      self.videos = results.videos
    })
  }
  getVideos()

}

  // AUTHENTICATION
  function userService($http){
    var vm = this;

    vm.signup = function(name, email, password){
      return $http.post('/users/',{
        name: name,
        email: email,
        password: password
      })
    }

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

  chartData.inject = ['$scope']
  function chartData($scope) {
    $scope.myData = [[1,4,5,5,10], [9,3,4,5,6]] ;
    $scope.myObj = {
      type : 'bar',
      series:[
          {
              backgroundColor : "#FAEE00"
          },
          {
              backgroundColor : "#A0FFEE"
          }
        ]
    };
  }


})()
