var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = Schema({
  created_at: {type:Date, default: new Date()}, 
  name  : String,
  email   : String,
  optin: {type: Boolean, default: false},
  nurseNotes: String,
  policeNotes: String,
  myNotes: String,
  createdAt: Date,
  dropboxLink: String,
  policeDropboxLinks: [],
  detective: String,
  processed: Boolean,
  whyNotProcessed: String,
  sentDate: Date,
  labName: String,
  lastNotifiedAt: Date,
  suspectType: String,
  caseNumber: String
});

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;
