(function(){

angular.module('videoEmotions')
  .controller('VideoController', VideoController)

VideoController.$inject = ["videoService", '$state']

function VideoController(videoService, $state){
  var vm = this;
  vm.title = "VideoController"
  return;
}
  
})()
