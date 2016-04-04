var
  mongoose = require('mongoose'),
  Schema = mongoose.Schema

var userSchema = Schema({
  email: String,
  name: String,
  password: String,
  videos: [{type: Schema.Types.ObjectId, ref: "Video"}]
}) 

var User = mongoose.model("User", userSchema)

module.exports = User 
