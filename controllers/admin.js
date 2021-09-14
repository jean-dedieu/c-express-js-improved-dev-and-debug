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
      //create and save product model in database  
      //associated with user
      req.user.createProduct({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description
       });
      Product.create()
      .then(result => {
        //console.log(result);
        console.log('Succes, created product');
        
      })
      .catch(err => {
        console.log(err);
      });   
      res.redirect('/admin/products')
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
    //fetch products with related users
    req.user.getProducts({where :{id: prodId}})
    //Product.findByPk(prodId)
    .then(
      products => {
        const product = products[0];
        if (!product){
          return res.redirect('/');
        }
        res.render('admin/edit-product', {
          pageTitle: 'Modifier produit',
          path: '/admin/edit-product',
          editing: editMode,
          product: product
      });
     })
    .catch(err => console.log(err));
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
    Product.findByPk(prodId)
    .then(product => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDesc;
      product.imageUrl = updatedImageUrl;
      return product.save();
    })
    .then(result => {
      console.log('Le joueur a bien été mis à jour');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
      //after saving the edit product, we redirect to /admin
  
  };
/**
 * 
 * @param {*} req receives admin/products view page request
 * @param {*} res returns admin/products view page as response
 * @param {*} next continues execution
 * This function will fetch the products that can only be seeb by the admin
 */
  exports.getProducts = (req, res, next) => {
    req.user
    .getProducts()
    .then(
      (products) =>{
        res.render('admin/products', {
          prods: products,
          pageTitle: 'Boutique Admin',
          path: '/products'
        });
      })
    .catch(err => console.log(err));
  };

  exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findByPk(prodId)
    .then(product => { 
      return product.destroy();
    })
    .then((result => {
      console.log('Le joueur a bien été supprimé');
      res.redirect('/admin/products');
    })) 
    .catch(err => console.log(err));
    

  }