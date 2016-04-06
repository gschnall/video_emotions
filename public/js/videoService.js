(function(){
  angular.module('videoEmotions')
    .factory('videoService', videoService)

  videoService.$inject = ['$http']

  function videoService($http){
    var vidUrl = '/videos/'

    var service = {
      index: index,
      show: show,
      create: create,
      update: update,
      analyze: analyze,
      destroy: destroy
    }

    return service

    //factory functions://
    function index(){
      return $http.get(vidUrl)
    }
    function show(id){
      return $http.get(vidUrl + id)
    }
    function create(data){
      return $http.post(vidUrl, data)
    }
    function update(id, data){
      return $http.post(vidUrl + id, data)
    }
    function destroy(id){
      return $http.delete(vidUrl + id)
    }
    function analyze(video){

    userService.getEmotions({"url": self.nbapPath + '.png'}).success(function(response){
      console.log(response)
    })

    function userService($http){
      //var emotionApiUrl = "http://api.projectoxford.ai/emotion/v1.0/recognizeinvideo"
      var service = {
        getEmotions: getEmotions
      }
      return service
    }

    function getEmotions(data){
      var req = {
        method: 'POST',
        url: 'http://api.projectoxford.ai/emotion/v1.0/recognizeinvideo',
        headers: {
          "Content-Type": "application/json",
          "Ocp-Apim-Subscription-Key","e70c99a17fd64405965c2254a0e89b2a"
        }
        data: data
        return $http(req)
      }
    }

      $http({
             url: "http://api.projectoxford.ai/emotion/v1.0/recognizeinvideo",
             headers: function(xhrObj){
                 // Request headers
                 xhrObj.setRequestHeader("Content-Type","application/json");
                 xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","e70c99a17fd64405965c2254a0e89b2a"    );
             },
             method: "POST",
             // Request body
              data: '{"url":' + video + '}',
         })
         .then(function(data) {
           console.log(data)
           console.log('success')
          return $http.post(vidUrl + video, {data: data})
         })

    };

    }
  // END videoservice function
})()
