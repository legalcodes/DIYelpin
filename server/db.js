var mongoose = require('mongoose');
var mongoURI = 'mongodb://diyelpin:Beansandburrito1600@ds047335.mongolab.com:47335/heroku_ws06b5hx';
mongoose.connect(process.env.MONGOLAB_URI || mongoURI); //this needs to change

var db = mongoose.connection;

var User;
var exports = module.exports;

db.on('error', console.error.bind(console, 'connection error'));

db.once('open', function() {
  console.log('were connected');
});

var UserSchema = mongoose.Schema({
  username: {
    type: String,
    index: { unique: true },
  },
  password: String,
});

var PostSchema = mongoose.Schema({
  username: String,
  category: {
    type: String,
    index: { unique: true },
    required: true,
  },
  title: {
    type: String,
    index: { unique: true },
    required: true,
  },
  message: String,
  votes: { type: Number, default: 0 },
});

var User = mongoose.model('User', UserSchema);
var Post = mongoose.model('Post', PostSchema);

exports.createUser = function(obj) {
  var user = new User(obj);
  user.save(function(err, user) {
    if (err) {
      console.error('error in create user method');
    };
  });
};

exports.createPost = function(obj) {
  var post = new Post(obj);
  post.save(function(err, post) {
    if (err) {
      console.error('error in creating the post');
    }
  });
};

exports.findAllPosts = function() {
  return Post.find({}, function(err, result) {
    if (err) {
      console.error('error in find all post');
    } else {
      return result;
    }
  });
};