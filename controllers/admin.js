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
    res.render('admin/edit-product', {
      pageTitle: 'Ajout produit',
      path: '/admin/add-product',
      editing: false
    });
  };

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

      const product = new Product(null, title, imageUrl, price, description);
      product.save();
      res.redirect('/');
  };
  /**
   * 
   * @param {*} req receives query with product id to be edited
   * @param {*} res returns edit-product page with the product form 
   * @param {*} next continues execution
   * @returns 
   */
  exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode){
      return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
      if (!product){
        return res.redirect('/');

      }
      res.render('admin/edit-product', {
        pageTitle: 'Modifier produit',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
    });
   });
  };

  /**
   * 
   * @param {*} req receives a request to update a product
   * @param {*} res return the upadated product fields
   * @param {*} next continues execution
   */
  exports.postEditProduct = (req, res, next)  => {
    //extract the product Id
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDesc = req.body.description;
    const updatedProduct = new Product(
      prodId, 
      updatedTitle,
      updatedImageUrl,
      updatedPrice,
      updatedDesc
      );
      updatedProduct.save();
      //after saving the edit product, we redirect to /admin
      res.redirect('/admin/products');
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
  };

  exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.deleteById(prodId);
    res.redirect('/admin/products');

  }