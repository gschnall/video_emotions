var
  Video = require('../models/Video.js'),
  randStr = require('../public/js/rndStr.js'),
  videoUploader = require('../public/js/videoUploader.js'),
  fs = require('fs'),
  multiparty = require('multiparty'),
  AWS = require('aws-sdk'),
  ffmpeg = require('fluent-ffmpeg'),
  streamingS3 = require('streaming-s3')


var videoCtrl = {
  //list all videos
  index: function(req, res){
    Video.find({}, function(err, videos){
      if(err) throw err
      res.json({success: true, videos: videos})
    })
  },
  show: function(req, res){
    Video.find({_id: req.params.id}, function(err, video){
      if(err) throw err
      res.json({success: true, video: video})
    })
  },
  create: function(req, res){
    Video.create(req.body, function(err, video){
      if(err) throw err
      res.json({success: true, video: video})
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
  }
// END videoCtrl object 
}

module.exports = videoCtrl
