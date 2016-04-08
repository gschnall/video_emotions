//var Video = require('../../models/Video.js')
// SCRIPT TO UPLOAD VIDEO TO S3
//----env variables
var rootDir = process.env.PWD = process.cwd() || ''

try {
  require('dotenv').config();
} catch (ex) {
  handleErr(ex)
}

var s3 = require('s3');
var client = s3.createClient({
  maxAsyncS3: 20,     // this is the default
  s3RetryCount: 3,    // this is the default
  s3RetryDelay: 1000, // this is the default
  multipartUploadThreshold: 20971520, // this is the default (20 MB)
  multipartUploadSize: 15728640, // this is the default (15 MB)
  s3Options: {
    accessKeyId: process.env.AWS_ACCESS_ID,
    secretAccessKey: process.env.AWS_ACCESS_KEY,
  },
});

var vidUploader = {
  uploadVideo: function(fileName, req, video){
      //CREATE NEW VIDEO
     //var path = absolutePath + '/public/images/users/' + req.session.userId + '/';
     var path = './public/videos/'
     console.log(path)
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
         path = './public/videos';
         //MODIFICATION OF BELOW FUNCITON
       console.log('closing1')
       var params = {
        localFile: path + "/" + fileName + 'jpg',

      s3Params: {
        Bucket: "videoemo",
        Key: fileName + "jpg",
        // other options supported by putObject, except Body and ContentLength.
        // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
        },
      };
      var uploader = client.uploadFile(params);
      uploader.on('error', function(err) {
        console.error("unable to upload:", err.stack);
      });
      uploader.on('progress', function() {
      console.log("progress", uploader.progressMd5Amount,
              uploader.progressAmount, uploader.progressTotal);
      });
      uploader.on('end', function() {
        console.log("done uploading");
      });

      // //  var fStream = fs.createReadStream('public/videos/' + fileName + 'jpg')
      //  console.log('closing2')
      //  // SAVE PATH TO VIDEO ON S3
      //  console.log('closing2')
      //  var uploader = new streamingS3(fStream, {accessKeyId: process.env.AWS_ACCESS_ID, secretAccessKey: process.env.AWS_ACCESS_KEY},
      //  {
      //    Bucket: 'videoemo',
      //    Key: fileName + 'jpg',
      //    ContentType: 'image/jpg'
      //  }, function(err, resp, stats){
      //      if(err) return console.log('Error with upload: ', err);
      //      //Save data on video here (https://videoemo.s3.amazonaws.com/)
      //      console.log('Upload Stats:', stats);
      //      console.log('Upload Successful: ', resp);
      //    }
      //  );
     });

      // MODIFY ACCESS KEY IN CONFIG
    //  form.on('close', function(){
    //    console.log('closing')
    //    var fStream = fs.createReadStream('public/videos/' + fileName + 'jpg')
    //    // SAVE PATH TO VIDEO ON S3
    //    var uploader = new streamingS3(fStream, {accessKeyId: process.env.AWS_ACCESS_ID, secretAccessKey: process.env.AWS_ACCESS_KEY},
    //    {
    //      Bucket: 'videoemo',
    //      Key: fileName + 'jpg',
    //      ContentType: 'image/jpg'
    //    }, function(err, resp, stats){
    //        if(err) return console.log('Error with upload: ', err);
    //        //Save data on video here (https://videoemo.s3.amazonaws.com/)
    //        console.log('Upload Successful: ', resp);
    //        return resp.Location;
    //      }
    //    );
    //  });

     form.parse(req);
  }
}

module.exports = vidUploader
