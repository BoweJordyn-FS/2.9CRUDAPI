const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportServices = require('../services/passport');
const requireLogin = passport.authenticate('local', { session: false });
const AuthenticatonController = require('../controllers/authentication_controller');

router.post('/', AuthenticatonController.signup);
router.post('/signin', requireLogin, AuthenticatonController.signin);
module.exports = router;
