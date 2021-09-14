/**USE NODE.JS CORE MODULES
 * There are different core modules like fs, os, http, http
 * We can also import third party core modules like sequelize....
 *
 * http core module here will be imported
 * */

//const http = require('http'), express will do it automaticaly

const path = require('path');

/**EXPRESS JS
 * After installing express with npm
 * We will require it here to use it as third-party package
 */

const express = require('express');

//we use body parser as third-party module cause they remove and it to express,they remove and it to express that is it not stable
const bodyParser = require('body-parser');


//import error.js controller  to get it called
const errorController = require('./controllers/error');

//use database
const sequelize = require('./util/database');
//import models that we can relate them
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

//use our express as app object
const app = express();

//set a global configuration value to use  template engine
app.set('view engine', 'ejs');
app.set('views', 'views');

//import admin routes here
const adminRoutes = require('./routes/admin');

//import shop routes here
const shopRoutes = require('./routes/shop');


/*using body-parser that we installed and used as third-party module
 *if we don't put extended:false, it will give us an error that body-parser is deprecated*/
app.use(bodyParser.urlencoded({ extended: false }));
//CREATING NODE JS SERVER

/**This will create Event loop and keep running as long as there is incoming requests
 * We declare a variavble to stock server function
 * we say that createServer funcion will be applied to http core module
 * we will have 2 arguments that are request, and response
 * and in our function body, we tell what the function will do
 * and we do not forget to listen to our server port
 *
 */

//use express static object to serve html pages statically
app.use(express.static(path.join(__dirname, 'public')));
//reach out the data base and retrieve a user
app.use((req, res, next) => {
   User.findByPk(1).then(user => {
     req.user = user;
     next();
   })
   .catch(err => console.log(err));
});

//use our admin routes, this the router object exported with module.exports in routes/admin
app.use('/admin', adminRoutes);

//use our shop routes, this the router object exported with module.exports in routes/shop
app.use(shopRoutes);

/*serving error 404 page not found pages
app.use((req, res, next) => {
  //res.status(404).send('<h1>Ooops Page not found</h1>');
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});*/

//call get404() function located in error.js controller
app.use(errorController.get404);

app.use((req, res, next) => {
  res.status(201).render('shop', { pageTitle: 'Boutique' });
});

Product.belongsTo(User,{constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem});
Product.belongsToMany(Cart, { through: CartItem});
sequelize
//.sync({ force:true })
.sync()
.then(result => {
  return User.findByPk(1);
  //console.log(result);
  app.listen(3000);
})
.then(user => {
  if(!user){
    User.create({name:'Jean',email:'jeandedieu.emploi@gmail.com'});
  }
  return user;
})
.then(user => {
  //console.log(user);
  return user.createCart();
})
.then(cart => {
  app.listen(3000);
})
.catch(err => {
  console.log(err);
});
/*Code used before shortening the server creation and listening
 onst server = http.createServer(app);

server.listen(3000);*/

