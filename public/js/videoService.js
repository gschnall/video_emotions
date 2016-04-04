(function(){
  angular.module('videoEmotions')
    .factory('videoService', videoService)

  videoService.$inject = ['$http']

  function videoService($http){
    var service = {
      index: index
    }

    return service

    //factory functions://
    function index(){
      return;
    }
  }
})()
