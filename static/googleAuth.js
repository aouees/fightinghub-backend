const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const GOOGLE_CLIENT_ID = '';
const GOOGLE_CLIENT_SECRET = '';

const googleAuth = new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/login/google/callback"
},
    function (accessToken, refreshToken, profile, done) {
        done(null, profile);
    }
);

module.exports = googleAuth