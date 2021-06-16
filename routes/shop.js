//what user see
//path core module to serve our views pages, else the views pages paths will not work
const path = require('path');

const express = require('express');

const router = express.Router();

/*
**working with middleware, functions for processing requests in express
there are executed from top to bottom
*/
router.get('/', (req, res, next) => {
   // res.send('<h1>Shop and Home Page!</h1>');
   //sending HTML file
   res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));
  });
  

module.exports = router;