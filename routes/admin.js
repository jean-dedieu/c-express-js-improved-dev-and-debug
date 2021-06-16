//for shop administration
//path core module to serve our views pages, else the views pages paths will not work
const path = require('path');

const express = require('express');

const router = express.Router();

/*
**working with middleware, functions for processing requests in express
there are executed from top to bottom
*/

/*This is the middleware that will know what to do with the request from the form
we precise also that it will handle the POST incoming requests*/
router.get('/add-product', (req, res, next) => {
    //sending HTML file
    res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
  });

//add product router
router.post('/add-product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
  });

/*homepage router
router.get('/',(req ,res ,next) =>  {
    console.log('In home middleware');
    res.send('<h1>Home page</h1>');
    next();
 
});*/

module.exports = router;