//what user see
//path core module to serve our views pages, else the views pages paths will not work
const path = require('path');

const express = require('express');

//importing products controller
const shopController = require('../controllers/shop');

const router = express.Router();

/**
 * Gets all products of the shop
 * When /nothing route is accessed
 * It will call getProducts function
 * In controllers/products
 */

 /**Routers
  * get products page
  * get cart page
  * get checkout page
  * get orders page
  * get products by id
  */
router.get('/', shopController.getIndex);

router.get('/products',shopController.getProducts);

router.get('/products/:productId',shopController.getProduct)

router.get('/cart',shopController.getCart);

router.get('/orders',shopController.getOrders);

router.get('/checkout',shopController.getCheckout);


module.exports = router;