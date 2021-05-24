/**USE NODE.JS CORE MODULES
 * There are different core modules like fs, os, http, http
 * We can alsp import third party core modules like sequelize....
 * 
 * http core module here will be imported
 * */
const http = require('http');


//CREATING NODE JS SERVER
 
 /**This will create Event loop and keep running as long as there is incoming requests
  * We declare a vvariavle to stcok server function
  * we say that createServer funcion will be applied to http core module
  * we will have 2 arguments that are request, and response
  * and in our function body, we tell what the function will do
  * and we do not forget to listen to our server port
  */
const server = http.createServer((req,res) =>{
  //to get request data, here we get headers, used method etc
    console.log(req.url,req.method,req.headers);

    /**
     * return a response to the request
     * Here down we declare content type as html text
     * */
    res.setHeader('Content-Type','text/html');
    //write manually our html response

    res.write('<html>');
    res.write('<head><title>My first page</title></head>');
    res.write('<body><h1>Hello from Node.js coded by Jean de Dieu</h1></body>')
    res.write('</html>');
    res.end();
});

server.listen(3000);