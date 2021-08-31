//what user see
//path core module to serve our views pages, else the views pages paths will not work
const path = require('path');

const express = require('express');
//import path helper
const rootDir = require('../util/path');

//In order to get access to the products
 
const adminData  = require('./admin');

const router = express.Router();

/*
**working with middleware, functions for processing requests in express
*there are executed from top to bottom
*/
router.get('/', (req, res, next) => {
  //console.log('shop.js',adminData.products);
   // res.send('<h1>Shop and Home Page!</h1>');
   //sending HTML file
  // res.sendFile(path.join(rootDir, 'views', 'shop.html'));

  //declaring our products so that we can pass the data in our dynamic pages
const products = adminData.products;
  //render our dynamic page file 
  res.render('shop', {
    prods: products,
    pageTitle: 'Boutique',
    path: '/',
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS:true
  });
  });
  

module.exports = router;