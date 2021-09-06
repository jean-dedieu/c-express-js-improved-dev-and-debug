const fs = require('fs');
const path = require('path');
const Cart = require('./cart');

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
    constructor(id,title,imageUrl, price, description){
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }

    //save products in products array
    save() {
        getProductsFromFile(products => {
          if (this.id) {
            const existingProductIndex = products.findIndex(
              prod => prod.id === this.id
            );
            const updatedProducts = [...products];
            updatedProducts[existingProductIndex] = this;
            fs.writeFile(p, JSON.stringify(updatedProducts), err => {
              console.log(err);
            });
          } else {
            this.id = Math.random().toString();
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), err => {
              console.log(err);
            });
          }
        });
      }
    
      /**
       * 
       * @param {*} id 
       */
    static deleteById(id) {
        getProductsFromFile(products => {
            const product = products.find(prod => prod.id === id);
            const updatedProducts = products.filter(prod => prod.id === id); 
           fs.writeFile(p, JSON.stringify(updatedProducts), err => {
               if(!err){
                   Cart.deleteProduct(id, product.price);
               }
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