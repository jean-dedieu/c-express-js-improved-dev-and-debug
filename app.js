/**USE NODE.JS CORE MODULES
 * There are different core modules like fs, os, http, http
 * We can also import third party core modules like sequelize....
 * 
 * http core module here will be imported
 * */
const http = require('http');

/**
 * importing  routes.js
 * to use the function that we created in there to handle requests
 * in routes.js, it will look the exported module and what is in side the module
 * */

const routes = require('./routes');

//CREATING NODE JS SERVER
 
 /**This will create Event loop and keep running as long as there is incoming requests
  * We declare a variavble to stock server function
  * we say that createServer funcion will be applied to http core module
  * we will have 2 arguments that are request, and response
  * and in our function body, we tell what the function will do
  * and we do not forget to listen to our server port
  * 
  */
 //the multiple thing exported in routes
 console.log(routes.someText);
 const server = http.createServer(routes.handler);

server.listen(3000);