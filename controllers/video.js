var
  Video = require('../models/Video.js'),
  User = require('../models/User.js')
  rStr = require('../public/js/rndStr.js'),
  videoUploader = require('../public/js/videoUploader.js'),
  fs = require('fs'),
  multiparty = require('multiparty'),
  AWS = require('aws-sdk'),
  ffmpeg = require('fluent-ffmpeg'),
  streamingS3 = require('streaming-s3'),
  ajax = require('simple-ajax'),
  http = require('http'),
  jquer = require('jquery')

// ----require env variables
try {
  require('dotenv').config();
} catch (ex) {
  handleErr(ex)
}


var videoCtrl = {
  //list all videos
  index: function(req, res){
    Video.find({}, function(err, videos){
      if(err) throw err
      res.json({success: true, videos: videos})
    })
  },
  show: function(req, res){
    Video.find({email: req.body.email}, function(err, video){
      if(err) throw err
      res.json({success: true, video: video})
    })
  },
  create: function(req, res){
    User.findOne({email: req.params.email}, function(err, user){
      if(err) throw err
      var video = new Video()
      video.user = user
      console.log(req)
      // INITIATE UPLOAD TO S3
      var fileName = rStr.stringDate12() + "."
      // SHOOT VIDEO TO S3 AND GET LINK TO VIDEO
      console.log(videoUploader.uploadVideo(fileName, req, video));
      video.title = "Video-"+String(user.videos.length-1)
      video.videoUrl = "https://s3-us-west-1.amazonaws.com/videoemo/" + fileName + "jpg"
      // PUSH VIDEO TO USER ARRAY
      user.videos.push(video)
      user.save(function(err, newUser){
        if(err) throw err
        video.save(function(err, video){
          if(err) throw err
          res.redirect('/#/library')
          //res.json(newUser)
        })
      })
    })
  },
  destroy: function(req, res){
    Video.findOneAndRemove({_id: req.params.id}, function(err, video){
      if(err) throw err
      res.json({success: true, destroyedVideo: video})
    })
  },
  edit: function(req, res){
    Video.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, video){
      if(err) throw err
      res.json({success: true, video: video})
    })
  },
  analyze: function(req, res){
    Video.findOne({_id: req.params.id}, function(err, video){
      if(err) throw err
      console.log(video.videoUrl)
      console.log(req.body)
    })
  }
// END videoCtrl object
}

module.exports = videoCtrl
