
exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
      pageTitle: 'Panier',
      path: 'shop/cart',
      formsCSS: true,
      productCSS: true
    
    });
  }