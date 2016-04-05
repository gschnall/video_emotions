var
  express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  videoRoutes = require('./routes/videoRoutes.js'),
  userRoutes = require('./routes/userRoutes.js'),
  authRoutes = require('./routes/authRoutes.js')
  config = require('./config.js'),
  morgan = require('morgan')
  jwt = require('jsonwebtoken')

// CONNECT TO MONGO-DB -----
var db = 'mongodb://localhost/video-emotions'
mongoose.connect(db, function(err){
  if(err) return console.log('!!Could not connect to db: ' + db)
  console.log('Connected to db at: ' + db)
})
  
// JWS AUTH :::::
app.set('superSecret', String(config.secret))

// MIDDLEWARE ---------
app.use('/public', express.static(__dirname + '/public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(morgan('dev'))

// ROOT ROUTE ---------
app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html')
})


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
