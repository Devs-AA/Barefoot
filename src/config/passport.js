import passport from 'passport';
import GoogleToken from 'passport-google-token';
import FacebookTokenStrategy from 'passport-facebook-token';
import dotenv from 'dotenv';

const GoogleTokenStrategy = GoogleToken.Strategy;

dotenv.config();

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
} = process.env;


passport.use(new GoogleTokenStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  profileFields: ['name', 'photos', 'email']
},
(accessToken, refreshToken, profile, done) => {
  const user = {
    accessToken,
    refreshToken,
    profile
  };
  return done(null, user);
}));

passport.use(new FacebookTokenStrategy({
  clientID: FACEBOOK_CLIENT_ID,
  clientSecret: FACEBOOK_CLIENT_SECRET,
  profileFields: ['name', 'photos', 'email']
},
(accessToken, refreshToken, profile, done) => {
  const user = {
    accessToken,
    refreshToken,
    profile
  };
  return done(null, user);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));


export default passport;
