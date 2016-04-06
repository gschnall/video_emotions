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
      return $http.delete(vidUrl + 'analyze/' + video) 
    }
  // END videoservice function
  }
})()
