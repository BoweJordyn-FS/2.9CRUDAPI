const passport = require('passport');

// Reusable authentication middleware. Rejects any request that does not carry a
// valid JWT (sent as `Authorization: bearer <token>`). Attach it to any route or
// router that should be protected, e.g. `app.use('/api/v1/movies', requireAuth, ...)`.
module.exports = passport.authenticate('jwt', { session: false });
