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
    Post.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
      res.send(post);
    });
  });

  app.post('/api/posts', auth.ensureAuthenticated, function (req,res) {
    User.findById(req.userId).exec(function(err, user) {
      var post = new Post(req.body);
      post.save(function(err, post) {
        res.send(post);
      });
    });
  });
};
