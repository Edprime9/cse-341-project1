const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
  res.send('Welcome to CSE 341 Project 1!');
});

// Register the contacts routes
router.use('/contacts', require('./contacts'));

module.exports = router;