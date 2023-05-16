const passport = require("passport");
const FacebookStrategy = require("passport-facebook");

const clientID = process.env.FACEBOOK_CLIENT_ID;
const clientSecret = process.env.FACEBOOK_CLIENT_SECRET;
const callbackURL = process.env.FACEBOOK_REDIRECT_CALLBACK;

const strategyConfig = new FacebookStrategy(
  {
    clientID,
    clientSecret,
    callbackURL
  },
  (accessToken, refreshToken, profile, done) => {
    console.log(profile)
    
    done(null, profile)
  }
);

module.exports = {
  loginFacebookInitialize: () => passport.use(strategyConfig),
};
