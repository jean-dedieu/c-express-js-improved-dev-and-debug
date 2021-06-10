/**USE NODE.JS CORE MODULES
 * There are different core modules like fs, os, http, http
 * We can also import third party core modules like sequelize....
 * 
 * http core module here will be imported
 * */


//const http = require('http'), express will do it automaticaly


/**EXPRESS JS
 * After installing express with npm
 * We will require it here to use it as third-party package
 */

const express = require('express');

//use our express as app object
const app = express();


//CREATING NODE JS SERVER
 
 /**This will create Event loop and keep running as long as there is incoming requests
  * We declare a variavble to stock server function
  * we say that createServer funcion will be applied to http core module
  * we will have 2 arguments that are request, and response
  * and in our function body, we tell what the function will do
  * and we do not forget to listen to our server port
  * 
  */

/*
**working with middleware, functions for processing requests in express
there are executed top bottom
*/
app.use((req ,res ,next) =>  {
    console.log('In the middleware');
    next(); //allows the request to continue to the next middleware
});

app.use((req ,res ,next) =>  {
    console.log('In another the middleware');
    res.send('<h1>Hello from Express</h1>');//here express will set headers and text-type for us
});

 /*Code used before shortening the server creation and listening
 onst server = http.createServer(app);

server.listen(3000);*/

app.listen(3000);
