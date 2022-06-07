// set up api routes
const router = require('express').Router();
const userRoutes = require('./user-routes');
// const thoughtRoutes = require('./thought-routes');

// import user and thought routes
router.use('/users', userRoutes);
// router.use('/thoughts', thoughtRoutes);

// router export for api
module.exports = router;