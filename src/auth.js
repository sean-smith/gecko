var credentials = require('./credentials')
var uberStrategy = require('passport-uber-v2').Strategy
var passport = require('passport')

passport.use(new uberStrategy({
    clientID: credentials.client_id,
    clientSecret: credentials.client_secret,
    callbackURL: "http://gecko.seanssmith.com:8080/auth/uber/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ uberid: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));