const path = require('path');


/**
 * 
 * @param {*} req receives request object
 * @param {*} res returns response object with Page not found error
 * @param {*} next continues execution
 */
exports.get404 = (req, res, next) => {
    res.status(404).render('404', {
         pageTitle: 'Page introuvable',
         path: '/Error'
         });
  };