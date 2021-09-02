
const Product = require('../models/product');


  /**
   * We declare our products so that we can pass the data in our dynamic pages
   * @param {*} req receives request
   * @param {*} res returns returns responser to get products 
   * @param {*} next continues execution
   * Render our dynamic page file
   */
  exports.getProducts =   (req, res, next) => {  
      Product.fetchAll((products) =>{
        res.render('shop/product-list', {
          prods: products,
          pageTitle: 'Tous nos produits',
          path: '/products',
          hasProducts: products.length > 0,
          activeShop: true,
          productCSS:true
        });
      });  
    };


/**
 * 
 * @param {*} req receives shop index page 
 * @param {*} res returns shop index page as response
 * @param {*} next continues execution
 */
exports.getIndex = (req, res, next) =>{
  Product.fetchAll((products) =>{
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Boutique',
      path: '/'
    });
  });
}

/**
 * 
 * @param {*} req receives shop cart page request
 * @param {*} res returns shop cart page as response
 * @param {*} next continues execution
 */
exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    pageTitle: 'Ton Panier',
    path: '/cart' 
  });
}

/**
 * 
 * @param {*} req receives shop checkout page as request
 * @param {*} res returns shop checkout page as response
 * @param {*} next continues execution
 */
exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    pageTitle: 'Recaptulatif',
    path: '/checkout'
  });
}

/**
 * GET Orders
 * @param {*} req receives shop orders page request with orders data
 * @param {*} res returns shop orders view pages with client data
 * @param {*} next 
 */
exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    pageTitle: 'Commandes',
    path: '/orders' 
  });
}