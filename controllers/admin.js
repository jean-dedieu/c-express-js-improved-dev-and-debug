const Product = require('../models/product');

/**Function for admin/add-product
 * When the route will be accessed by the user
 * This fucntion will be called inside our routes in admin.js
 * It will return the add-product page
 * @param {*} req receives request object
 * @param {*} res returns response object
 * @param {*} next continues the execution
 */
 exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
      pageTitle: 'Ajout produit',
      path: '/admin/add-product'
    });
  }

  /**
   * 
   * @param {*} req receives request object
   * @param {*} res returns response object
   * @param {*} next continues execution
   * Push data in products array
   * And finally redirect to the index page at '/'
   * 
   */
  exports.postAddProduct = (req, res, next) => {
      const title = req.body.title;
      const imageUrl = req.body.imageUrl;
      const price = req.body.price;
      const description =req.body.description;

      const product = new Product(title, imageUrl, description, price);
      product.save();
      res.redirect('/');
  };
/**
 * 
 * @param {*} req receives admin/products view page request
 * @param {*} res returns admin/products view page as response
 * @param {*} next continues execution
 * This function will fetch the products that can only be seeb by the admin
 */
  exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) =>{
        res.render('admin/products', {
          prods: products,
          pageTitle: 'Boutique Admin',
          path: '/products'
        });
      });
  }