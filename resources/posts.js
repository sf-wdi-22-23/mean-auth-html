var Post = require('../models/post.js')
	, User = require('../models/user.js')
  , auth = require('./auth')

module.exports = function(app) {
  app.get('/api/posts', auth.ensureAuthenticated, function (req,res) {
    Post.find().exec(function(err, posts) {
      res.send(posts);
    });
  });

  app.get('/api/posts/:id', auth.ensureAuthenticated, function (req,res) {
    Post.findById(req.params.id).exec(function(err, post) {
      res.send(post);
    });
  });

  app.post('/api/posts/:id', auth.ensureAuthenticated, function (req,res) {
    Post.findById(req.params.id, function(err, post) {
      post.whyNotProcessed = req.body.whyNotProcessed;
      post.detective = req.body.detective;
      post.caseNumber = req.body.caseNumber;
      post.suspectType = req.body.suspectType;
      post.policeDropboxLinks = req.body.policeDropboxLinks;
      post.myNotes = req.body.myNotes;
      post.policeNotes = req.body.policeNotes;
      post.expectedDate = req.body.expectedDate;
      
      var notifyUser = false;
      if (post.processed !== req.body.processed) {
        notifyUser = true;
        post.processed = req.body.processed;
      }

      post.save(function(err) {
        if (post && notifyUser) {
          if (req.body.processed === true) {
            app.mailer.send('emails/processed', {
              to: req.body.email,
              subject: 'Your case update',
              post: post
            }, function (err) {
              if (err) { console.log(err); return }
            });
          }
          else {
            app.mailer.send('emails/notProcessed', {
              to: req.body.email,
              subject: 'Your case update',
              post: post
            }, function (err) {
              if (err) { console.log(err); return }
            });
          }
        }
        res.send(post);
      });
    });
  });

  app.post('/api/posts', auth.ensureAuthenticated, function (req,res) {
    User.findById(req.userId).exec(function(err, user) {
      var post = new Post(req.body);
      post.save(function(err, post) {
        if (req.body.email) {
          app.mailer.send('emails/welcome', {
            to: req.body.email,
            subject: 'Your case has begun'
          }, function (err) {
            if (err) { console.log(err); return }
          });
        };
        res.send(post);
      });
    });
  });
};
