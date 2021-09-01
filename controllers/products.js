
const Product = require('../models/product');

/**Function for admin/add-product
 * When the route will be accessed by the user
 * This fucntion will be called inside our route in admin.js
 * It will return the add-product page
 * @param {*} req receives request object
 * @param {*} res returns response object
 * @param {*} next continues the execution
 */
exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
      pageTitle: 'Ajout produit',
      path: '/admin/add-product',
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true
    });
  }

  /**
   * 
   * @param {*} req receives request object
   * @param {*} res returns response object
   * @param {*} next continues execution
   * Push data in products array
   * 
   */
  exports.postAddProduct = (req, res, next) => {
      const product = new Product(req.body.title);
      product.save();
    res.redirect('/');
  }

  /**
   * We declare our products so that we can pass the data in our dynamic pages
   * @param {*} req receives request
   * @param {*} res returns returns responser to get products 
   * @param {*} next continues execution
   * Render our dynamic page file
   */
  exports.getProducts =   (req, res, next) => {  
      Product.fetchAll((products) =>{
        res.render('shop', {
          prods: products,
          pageTitle: 'Boutique',
          path: '/',
          hasProducts: products.length > 0,
          activeShop: true,
          productCSS:true
        });
      });
   
    };