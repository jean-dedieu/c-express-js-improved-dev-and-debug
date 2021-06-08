
 /**THIS FILE PURPOSE
  * we need to connect this file:routes.js to app.js
  */

 //file system core module import
 const fs = require('fs');

/**
 * creating function that will help us to handle requests
 * its bracket is closed at the end of the code
 * here we need to export this request handler 
 * so that we can use it outside of this file
 * to use it out of this file, we will always need to import it
 * in the file in which we want to use it
*/

const requestHandler = (req,res) => {
    const url = req.url;
    const method = req.method;


  
  if(url === '/'){
    //write manually our html response
   
    res.write('<html>');
    res.write('<head><title>My first page</title></head>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button><form></body>');
    res.write('</html>');
   return res.end();
 }

 /**
  * if the url is port /message
  * and POST is the method used to send the form
  * we will write a message in message.txt file
  * and redirect to the / nothing:home
 
 if(url === '/message' && method === 'POST'){
   fs.writeFileSync('message.txt','Petitmessage');
   res.statusCode = 302;
   res.setHeader('Location', '/');

   return res.end();
 } */

 
 if(url === '/message' && method === 'POST'){
   //the request body, to stock the result of the request on which we will listen
   const body = [];

   //listening to request event, on its an event, chunck is data
   req.on('data',(chunk)=>{
     //on request event, we will push our chunck in the body
     console.log(chunk);
     body.push(chunk);
   });
   //when done incoming request
  return req.on('end', () => {
   /**
    * creating our bus==buffer that wait the data:chunck
    * Buffer is a JavaScript native word
    * concat is a JavaScript native word
    * toString is a JavaScript native word, we  know we will reveive text
    */
     
   const parseBody = Buffer.concat(body).toString();
   //console.log(parseBody);
   /**split the message we got from our form
    * messsage is variable to stock our form text
    * note that message is also name given to our form= name="message"
    * then we save our message in our file
   */
   const message = parseBody.split('=')[1];
   /**we don't want to block our code with writeFileSync
    * if an error occur here, we will be redirected
    * and when the action finished, we will also be redirected
   */
   fs.writeFile('message.txt',message,err  =>  {
     res.statusCode = 302;
     res.setHeader('Location', '/');
     return res.end();
   }); 
   });

 }
 /*to get request data, here we get headers, used method etc
   console.log(req.url,req.method,req.headers);*/

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

}
//export our function that ahndles requests and return responses
//module.exports = requestHandler;

/**EXPORTING MULTIPLE THINGS
 * so in app we will have routes.handler and routes.someText
*/
module.exports = {
    handler: requestHandler,
    someText: 'Some hard text'
} 