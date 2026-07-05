const router = require('express').Router();

// Register the contacts routes
router.use('/contacts', require('./contacts'));

router.get('/', (req, res) => {
  res.send('Welcome to CSE 341 Project 1!');
});

module.exports = router;