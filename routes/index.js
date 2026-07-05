const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Welcome to CSE 341 Project 1!');
});

module.exports = router;