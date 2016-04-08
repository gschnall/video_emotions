var
  express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  videoRoutes = require('./routes/videoRoutes.js'),
  userRoutes = require('./routes/userRoutes.js'),
  authRoutes = require('./routes/authRoutes.js'),
  morgan = require('morgan'),
  jwt = require('jsonwebtoken'),
  aws = require('aws-sdk')

// :: SETUP ENV VARIABLES ::
try {
  require('dotenv').config();
} catch (ex) {
  handleError(ex)
}

// CONNECT TO MONGO-DB -----
var db = process.env.MONGOLAB_URI || 'mongodb://localhost/video-emotions'
mongoose.connect(db, function(err){
  if(err) return console.log('!!Could not connect to db: ' + db)
  console.log('Connected to db at: ' + db)
})

// JWS AUTH :::::
app.set('superSecret', process.env.SUPER_SECRET)

// MIDDLEWARE ---------
app.use('/public', express.static(__dirname + '/public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(morgan('dev'))

// ROOT ROUTE ---------
app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html')
})

app.get('/sign_s3', function(req, res){
   console.log('fired')
    aws.config.update({accessKeyId: process.env.AWS_ACCESS_ID, secretAccessKey: process.env.AWS_ACCESS_KEY});
    var s3 = new aws.S3();
    var s3_params = {
        Bucket: 'videoemo',
        Key: req.query.file_name,
        Expires: 60,
        ContentType: req.query.file_type,
        ACL: 'public-read'
    };
    s3.getSignedUrl('putObject', s3_params, function(err, data){
        if(err){
            console.log(err);
        }
        else{
            var return_data = {
                signed_request: data,
                url: 'https://videoemo.s3.amazonaws.com/'+req.query.file_name
            };
            res.write(JSON.stringify(return_data));
            res.end();
        }
    });
});

// USER ROUTES ---------
app.use('/users', userRoutes)

// AUTHENTICATION
app.use('/auth', authRoutes)

// VIDEO ROUTES ---------
app.use('/videos', videoRoutes)




var port = process.env.PORT || 3000
app.listen(port, function(err){
  if(err) throw err
  console.log('Ready to Decipher Emotions on Port: ' + port )
})
