var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = Schema({
  name  : String,
  email   : String,
  optin: Boolean,
  notes: String
});

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;