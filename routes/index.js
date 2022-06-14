// set up routes
const router = require('express').Router();
const apiRoutes = require('./api');

// import api routes
router.use('/api', apiRoutes);

// error response
router.use((req, res) => {
  res.status(404).send('<h1>🤷🏿‍♂️ 404 Error! 🤷🏿‍♂️</h1>');
});

// router export
module.exports = router;
