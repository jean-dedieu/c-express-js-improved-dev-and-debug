const fs = require('fs');
const path = require('path');

//global path helper constant
const p = path.join(
    path.dirname(process.mainModule.filename), 
   'data',
   'products.json'
   );
   
//helper function
const getProductsFromFile = (cb) => {
  
    fs.readFile(p, (err, fileContent) => {
        if(err){
             cb([]);
        }else {
              cb(JSON.parse(fileContent));
        }      
    });

}
module.exports = path.dirname(process.mainModule.filename);
/**
 * Product Class
 * Blue print for product
 * Forms the product structure
 */
 //let products = [];
module.exports  = class Product {
    constructor(title,imageUrl, description, price){
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    //save products in products array
    save(){
        this.id = Math.random().toString;
        getProductsFromFile(products => {
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
            console.log(err);
        });
        });
    }
    
     /**
      *Fetch products from data/products.json file 
      * @param {*} cb call back that will be executed
      *  when done fetching products
      */
    static fetchAll(cb){
       getProductsFromFile(cb);      
    }
    
    /**
     * 
     * @param {*} id the product id that will be searched by the js find() method
     * @param {*} cb  call back that will be executed after find product in products
     */
    static findById(id, cb){
       getProductsFromFile(products => {
           const product = products.find(p => p.id === id);
           cb(product);


       });
    }

};