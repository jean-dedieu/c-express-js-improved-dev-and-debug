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
    constructor(t){
        this.title = t;
    }

    //save products in products array
    save(){
        getProductsFromFile(products => {
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
            console.log(err);
        });
        });
    }
    /**
     * retrieve the product data
     * Call fetchAll() method directly on the class
     */
     
    static fetchAll(cb){
       getProductsFromFile(cb);      
    }
};