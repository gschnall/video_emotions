var
  express = require('express'),
  app = express(),
  authRoutes = express.Router(),
  jwt = require('jsonwebtoken'),
  User = require('../models/User.js'),
  config = require('../config.js'),
  bcrypt = require('bcrypt')

// set token
app.set('superSecret', config.secret)

// Login Route
authRoutes.post('/', function(req, res){
  User.findOne({email: req.body.email}, function(err, user){
    if(err) throw err
    //User not found
    if(!user){
      res.json({success: false, message: 'User not found'})
    }
    else if(user){
      //Password does not match
      if(bcrypt.compareSync(req.body.password, user.password) != true){
        res.json({success: false, message: 'yo wrong password bro'})
      }
      else{
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresIn: 61440
        });

        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }
    }
  })
});

// MIDDLEWARE TO VERIFY TOKEN
authRoutes.use(function(req, res, next){
  // check header or url params or post params for token
  var token = req.body.token || req.query.token || req.headers["x-access-token"]
  if(!token){
    res.json({success: false, message: 'you need a token son!'});
  }
  else{
    jwt.verify(token, app.get('superSecret'), function(err, decoded){
      if(err){
        return res.json({success: false, message: "That token is not legit"})
      }
      else{
        // token is legit, save it to the request object in other routes
        req.decoded = decoded;
        next();
      }
    })
  }
})

// token
authRoutes.get('/user', function(req, res){
  User.find({}, function(err, users){
    res.json(users);
  })
})

module.exports = authRoutes
