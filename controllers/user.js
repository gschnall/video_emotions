var
  User = require('../models/User.js'),
  bcrypt = require('bcrypt')

userRoutes = {
  index: function(req, res){
    User.find({email: req.body.email}, function(err, users){
      if(err) throw err
      res.json({users: users})
    })
  },
  show: function(req, res){
    User.find({_id: req.params.id}, function(err, user){
      if(err) throw err
      res.json({success: true, user: user})
    })
  },
  create: function(req, res){
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    // CREATE NEW USER HERE
    var newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hash
    })
    // SAVE NEW USER
    newUser.save(function(err, user){
      if(err) throw err
      res.json({success: true, newUser: user})
    })
  },
  destroy: function(req, res){
    User.findOneAndRemove({_id: req.params.id}, function(err, user){
      if(err) throw err
      res.json({success: true, deletedUser: user})
    })
  },
  edit: function(req, res){
    User.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, user){
      if(err) throw err
      res.json({success: true, updatedUser: user})
    })
  }
// END userRoutes object
}

module.exports = userRoutes
