//for shop administration
//path core module to serve our views pages, else the views pages paths will not work
const path = require('path');

const express = require('express');

//import path helper
//const rootDir = require("../util/path");

/**Import productsController
 * Contains the function that will return add-product page with objects
 */
const adminController = require('../controllers/admin');

const router = express.Router();


//admin/add-product => GET
/**Route to get add-product page
 * This route will cal the fuction getAddProduct in products.js controller
 * To return the add-product page when add-product route is accessed
 * 
 */
router.get('/add-product', adminController.getAddProduct);
/*
**working with middleware, functions for processing requests in express
there are executed from top to bottom
*/

/**admin/products=> GET
 * Will get admin products for admin/product view
 */
router.get('/products', adminController.getProducts);

/*This is the middleware that will know what to do with the request from the form
we precise also that it will handle the POST incoming requests*/
router.get('/add-product', (req, res, next) => {
  //sending ejs file
  res.sendFile(path.join(rootDir, 'views/admin', 'edit-product.ejs'));
});

/**Post product router
 * 
 */
 router.post('/add-product', adminController.postAddProduct);

 router.get('/edit-product/:productId', adminController.getEditProduct);
 
 router.post('/edit-product', adminController.postEditProduct);
 
 router.post('/delete-product', adminController.postDeleteProduct);

 module.exports = router;
