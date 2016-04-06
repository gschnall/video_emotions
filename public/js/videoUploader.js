var Video = require('../../models/Video.js')
// SCRIPT TO UPLOAD VIDEO TO S3

//----env variables
try {
  require('dotenv').config();
} catch (ex) {
  handleErr(ex)
}

var vidUploader = {
  uploadVideo: function(fileName, req, video){
      //CREATE NEW VIDEO
     //var path = absolutePath + '/public/images/users/' + req.session.userId + '/';
     var path = 'public/videos/'
     //var fileName = rStr.stringDate12() + "."
     var maxSize = 87934588;

     var options = {uploadDir: path};
     var form = new multiparty.Form();

     form.keepExtensions = true;
     form.autoFiles = false;
     form.maxFileSize = 8793458;

     form.on('error', function(message) {
         res.end();
         res.status(413).send({message:'Upload too large'});
         return;
     });

     form.on('progress', function(recv, total){
       if(total >= maxSize){
           this.emit('error');
       }
     })

     form.on('file', function(name, file) {
         var type = file.headers['content-type'];
         type = type.split('/');
         type = type[1];
         fs.rename(file.path, path + fileName + 'jpg');
         path = 'public/videos';
         //MODIFICATION OF BELOW FUNCITON
       console.log('closing')
       var fStream = fs.createReadStream('public/videos/' + fileName + 'jpg')
       // SAVE PATH TO VIDEO ON S3
       video.videoUrl = fileName + '.jpg';
       var uploader = new streamingS3(fStream, {accessKeyId: process.env.AWS_ACCESS_ID, secretAccessKey: process.env.AWS_ACCESS_KEY},
       {
         Bucket: 'videoemo',
         Key: fileName + 'jpg',
         ContentType: 'image/jpg'
       }, function(err, resp, stats){
           if(err) return console.log('Error with upload: ', err);
           //Save data on video here (https://videoemo.s3.amazonaws.com/)
           console.log('Upload Stats:', stats);
           console.log('Upload Successful: ', resp);
         }
       );
     });

      // MODIFY ACCESS KEY IN CONFIG
     form.on('close', function(){
       console.log('closing')
       var fStream = fs.createReadStream('public/videos/' + fileName + 'jpg')
       // SAVE PATH TO VIDEO ON S3
       var uploader = new streamingS3(fStream, {accessKeyId: process.env.AWS_ACCESS_ID, secretAccessKey: process.env.AWS_ACCESS_KEY},
       {
         Bucket: 'videoemo',
         Key: fileName + 'jpg',
         ContentType: 'image/jpg'
       }, function(err, resp, stats){
           if(err) return console.log('Error with upload: ', err);
           //Save data on video here (https://videoemo.s3.amazonaws.com/)
           console.log('Upload Successful: ', resp);
           return resp.Location;
         }
       );
     });

     form.parse(req);
  }
}

module.exports = vidUploader
