var User = require('../models/User.js')

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
    User.create(req.body, function(err, user){
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
