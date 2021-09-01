//for shop administration
//path core module to serve our views pages, else the views pages paths will not work
const path = require('path');

const express = require('express');

//import path helper
//const rootDir = require("../util/path");

/**Import productsController
 * Contains the function that will return add-product page with objects
 */
const productsController = require('../controllers/products');

const router = express.Router();

//import cart controller
const cart = require('../controllers/cart');

//admin/add-product => GET
/**Route to get add-product page
 * This route will cal the fuction getAddProduct in products.js controller
 * To return the add-product page when add-product route is accessed
 * 
 */
router.get('/add-product', productsController.getAddProduct);
/*
**working with middleware, functions for processing requests in express
there are executed from top to bottom
*/

/*This is the middleware that will know what to do with the request from the form
we precise also that it will handle the POST incoming requests*/
router.get('/add-product', (req, res, next) => {
  //sending ejs file
  res.sendFile(path.join(rootDir, 'views', 'add-product.ejs'));
});

/**Post product router
 * 
 */
router.post("/add-product", productsController.postAddProduct);

/*homepage router
router.get('/',(req ,res ,next) =>  {
    console.log('In home middleware');
    res.send('<h1>Home page</h1>');
    next();
 
});*/



module.exports = router;
