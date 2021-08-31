//what user see
//path core module to serve our views pages, else the views pages paths will not work
const path = require('path');

const express = require('express');

//importing products controller
const productsController = require('../controllers/products');

const router = express.Router();

/**
 * Gets all products of the shop
 * When /nothing route is accessed
 * It will call getProducts function
 * In controllers/products
 */
router.get('/', productsController.getProducts);
  

module.exports = router;