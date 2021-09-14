
const Product = require('../models/product');
//const cart = require('../models/cart');
const Cart = require('../models/cart');


  /**
   * We declare our products so that we can pass the data in our dynamic pages
   * @param {*} req receives request
   * @param {*} res returns returns responser to get products 
   * @param {*} next continues execution
   * Render our dynamic page file
   */
   exports.getProducts = (req, res, next) => {  
    Product.findAll().then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'Tous les joueurs',
        path: '/products'
      });
  
    }).catch(err => {
      console.log(err);
    });        
    };
  
    /**
     * 
     * @param {*} req receives a get request to show the product details when clicked
     * @param {*} res returns a product details page with full information on the product
     * @param {*} next continues  execution
     */
     exports.getProduct = (req, res, next) => {
      const prodId = req.params.productId;
      /*Product.findAll({ where: {id: prodId }})
      .then(products => {
        res.render('shop/product-detail', {
          product: products[0],
          pageTitle: products[0].title,
          path: '/products'
        });

      })
      .catch(err => 
        console.log(err));*/
    
      Product.findByPk(prodId)
      .then(product => {
          res.render('shop/product-detail', {
            product: product,
            pageTitle: product.title,
            path: '/products'
          })
          .catch(err => 
        console.log(err));;
    })
  };

/**
 * 
 * @param {*} req receives shop index page 
 * @param {*} res returns shop index page as response
 * @param {*} next continues execution
 */
 exports.getIndex = (req, res, next) =>{
  Product.findAll().then(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Boutique',
      path: '/'
    });

  }).catch(err => {
    console.log(err);
  });  
};

/**
 * 
 * @param {*} req receives shop cart page request
 * @param {*} res returns shop cart page as response with dynamic data
 * it checks if we have the products in our cart using prod.id
 * it store products in an array
 * then it calculates the quantity of products in cart
 * if no products, we will have an empty array
 * @param {*} next continues execution
 */
 exports.getCart = (req, res, next) => {
   
   req.user
   .getCart()
   .then(cart =>{
     return cart
     .getProducts()
     .then(products => {
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Votre Panier',
        products: products
      });

     })
     .catch(err => console.log(err));
   })
   .catch(err => console.log(err));
};

/**
 * 
 * @param {*} req sends post request with product id to add to the cart
 * @param {*} res returns the pages with the product id 
 * @param {*} next continues execution
 */
 exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user
  .getCart()
  .then(cart => {
    fetchedCart = cart;
    return cart.getProducts( { where: { id: prodId} })
  })
  .then(products => {
    let product;
    if (products.length > 0) {
       product = products[0];
    }
    
    if (product) {
      const oldQuantity = product.cartItem.quantity;
      newQuantity = oldQuantity + 1;
      return product;
    }
    return Product.findByPk(prodId)
    
  })
  .then(product => {
    return fetchedCart.addProduct(product, {
      through: { quantity: newQuantity }
    })

  })
  .then(() => {
    res.redirect('/cart');
  })
  .catch(err => console.log(err));
 /* Product.findByPk(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  //console.log(prodId);
  res.redirect('/cart');*/
}; 

/**
 * 
 * @param {*} req receives a delete product request
 * @param {*} res delete the itme from the cart and return the result
 * @param {*} next continues execution
 */
 exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
  .getCart()
  .then(cart => {
    return cart.getProducts({ where: { id: prodId}});
  })
  .then(products => {
    const product = products[0];
    return product.cartItem.destroy();
  })
  .then(result => {
    res.redirect('/cart');
  })
  .catch(err => console.log(err));
};
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
 * @param {*} res returns shop orders view pages with client dataf
 * @param {*} next 
 */
exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    pageTitle: 'Commandes',
    path: '/orders' 
  });
};
