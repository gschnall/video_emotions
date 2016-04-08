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
      reAnalyze: reAnalyze,
      destroy: destroy,
      addAnalysis: addAnalysis
    }

    return service

    //factory functions://
    function index(email){
      return $http.get(vidUrl + email)
    }
    function show(id){
      return $http.get(vidUrl + id)
    }
    function create(data) {
      return $http.post(vidUrl, data)
    }
    function update(id, data){
      return $http.post(vidUrl + id, data)
    }
    function destroy(id){
      return $http.delete(vidUrl + id)
    }
    function analyze(data){
        var req = {
        method: "POST",
        url: "https://api.projectoxford.ai/emotion/v1.0/recognize",
        headers: {
          "Content-Type": "application/json",
          "Ocp-Apim-Subscription-Key": "e70c99a17fd64405965c2254a0e89b2a"
        },
        data: data
        }
      return $http(req)
      }
    function reAnalyze(data){
      var req = {
      method: "POST",
      url: "https://api.projectoxford.ai/vision/v1.0/describe",
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": "7679cd4698414c4199543c6516c02327"
      },
      data: data
      }
    return $http(req)
    }

    }
    function addAnalysis(id, data){
      return $http({
        url: vidUrl + id,
        method: "POST",
        data: { 'data' : data }
      })
    }
// END videoservice function
})()
