var
  mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var videoSchema = Schema({
  title: String,
  text: String,
  allKeyWords: Array, 
  topKeyWords: Array,
  videoUrl: String,
  videoThumbnailUrl: String,
  textData: Array,
  videoData: Array,
  user: [{type: Schema.Types.ObjectId, ref: "User"}]
})

var Video = mongoose.model("Video", videoSchema)

module.exports = Video
