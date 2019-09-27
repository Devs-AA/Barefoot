import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import GoogleStrategy from 'passport-google-oauth20';

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL,
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
  FACEBOOK_CALLBACK_URL,
} = process.env;


passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  // callbackURL: GOOGLE_CALLBACK_URL,
  profileFields: ['name', 'photos', 'email']
},
(accessToken, refreshTocken, profile, done) => {
  const user = {
    accessToken,
    refreshTocken,
    profile
  };
  return done(null, user);
}));

passport.use(new FacebookStrategy({
  clientID: FACEBOOK_CLIENT_ID,
  clientSecret: FACEBOOK_CLIENT_SECRET,
  callbackURL: FACEBOOK_CALLBACK_URL,
  profileFields: ['name', 'photos', 'email']
},
(accessToken, refreshTocken, profile, done) => {
  const user = {
    accessToken,
    refreshTocken,
    profile
  };
  console.log(user)
  return done(null, user);
}));


export default passport;
