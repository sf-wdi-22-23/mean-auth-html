var mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    Schema = mongoose.Schema;

// GETTER
function toLower (v) {
  return v.toLowerCase();
}

var UserSchema = new Schema({
    created_at    : { type: Date }
  , updated_at    : { type: Date }
  , email         : { type: String, required: true, unique: true, trim: true, set: toLower }
  , password      : { type: String, select: false }
  , first         : { type: String, trim: true }
  , last          : { type: String, trim: true }
  , admin         : { type: Boolean, default: false }
  , badge         : { type: Number }
})

UserSchema.virtual('fullname').get(function() {
  return this.first + ' ' + this.last;
});

UserSchema.pre('save', function(next){
  // SET CREATED_AT AND UPDATED_AT
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }

  // ENCRYPT PASSWORD
  var user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash;
      next();
    });
  });
});


UserSchema.methods.comparePassword = function(password, done) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    done(err, isMatch);
  });
};

// SETTER
// function obfuscate (cc) {
//   return '****-****-****-' + cc.slice(cc.length-4, cc.length);
// }

// var AccountSchema = new Schema({
//   creditCardNumber: { type: String, get: obfuscate }
// });

var User = mongoose.model('User', UserSchema);

module.exports = User;
