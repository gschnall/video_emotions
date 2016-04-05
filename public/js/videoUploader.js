// SCRIPT TO UPLOAD VIDEO TO S3

var vidUploader = {
  uploadVideo: function(){
     //var path = absolutePath + '/public/images/users/' + req.session.userId + '/';
     var path = __dirname + '/public/videos/'
     var fileName = rStr.stringDate12() + "."
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
         fs.rename(file.path, path + fileName + 'mp4');
         path = __dirname + '/public/videos';
     });
 
      // MODIFY ACCESS KEY IN CONFIG 
     form.on('close', function(){
       var fStream = fs.createReadStream(__dirname + '/public/videos/' + fileName + 'mp4')     
       var uploader = new streamingS3(fStream, {accessKeyId: 'AKIAI7GAPV2K64P3DL4Q', secretAccessKey: '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'},
       {
         Bucket: 'videoemo',
         Key: fileName + 'mp4',
         ContentType: 'video/mp4'
       }, function(err, resp, stats){
           if(err) return console.log('Error with upload: ', err);
           //Save data on video here (https://videoemo.s3.amazonaws.com/)
           console.log('Upload Stats:', stats);
           console.log('Upload Successful: ', resp);
         }
       );
       res.json({success: true, path: path});
     });
 
     form.parse(req);
  }
}

module.exports = vidUploader
