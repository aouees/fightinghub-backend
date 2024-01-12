// import packages
const express = require('express')
const router = express.Router()
const passport = require('passport');
const googleAuth = require('../static/googleAuth');
const loginController = require('../controller/authenticate')

router.use(passport.initialize());
router.use(passport.session());
passport.use(googleAuth);

passport.serializeUser(function (user, cb) {
  cb(null, user);
});
passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});


// handling logIn request by google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// handling result of google authenticate
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/error', successRedirect: '/success' }));
// handling logIn request by email and pass
router.post('/', loginController.login);

module.exports = router