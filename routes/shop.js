//what user see

const express = require('express');

const router = express.Router();

/*
**working with middleware, functions for processing requests in express
there are executed from top to bottom
*/
router.get('/', (req, res, next) => {
    res.send('<h1>Shop and Home Page!</h1>');
  });
  

module.exports = router;