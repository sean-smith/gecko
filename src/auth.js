var credentials = require('./credentials')
var uberStrategy = require('passport-uber-v2').Strategy
var passport = require('passport')

passport.use(new uberStrategy({
    clientID: credentials.client_id,
    clientSecret: credentials.client_secret,
    callbackURL: "http://localhost:8080/auth/uber/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    var user = profile;
    user.accessToken = accessToken;
    return done(null, user)
  }
))