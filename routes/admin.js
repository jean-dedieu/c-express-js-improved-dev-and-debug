//for shop administration
//path core module to serve our views pages, else the views pages paths will not work
const path = require("path");

const express = require("express");

//import path helper
const rootDir = require("../util/path");

const router = express.Router();

/**Storing products in an array so that we can store them in a file
 *
 */
const products = [];

// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'Ajout produit',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
});

/*
**working with middleware, functions for processing requests in express
there are executed from top to bottom
*/

/*This is the middleware that will know what to do with the request from the form
we precise also that it will handle the POST incoming requests*/
router.get("/add-product", (req, res, next) => {
  //sending HTML file
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
});

//add product router

router.post("/add-product", (req, res, next) => {
  //console.log(req.body);
  /**Push admin data in products array
   *
   */
  products.push({title: req.body.title});
  res.redirect("/");
});

/*homepage router
router.get('/',(req ,res ,next) =>  {
    console.log('In home middleware');
    res.send('<h1>Home page</h1>');
    next();
 
});*/

exports.routes = router;
exports.products = products;
