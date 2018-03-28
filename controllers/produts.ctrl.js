var Product = require('../models/product.model');

module.exports={
    get:function(req,res){
    
        Product.find({},{'__v':0},function(err,products){
            if(err){
                res.status(500);
                res.send(err);
            }
            else{
                res.status(200);
                res.json(products);
            }
           
        })
       
    },
    getById:function(req,res){
        var id = req.params.id;
        Product.findById(id,{'__v':0},function(err,product){
            if(!err){
                if(product){
                    res.status(200);
                    res.json(product);
                }
                else{
                    res.status(404);
                    res.send("Product Not found");
                }               
            }
            else{               
                res.status(500);
                res.send(err);
            }
        })
       
    },
    save:function(req,res){
        var product=new Product(req.body);
        product.save(function(err,product){
            if(err){
                res.status(500);
                res.send(err);
            }
            else{
                res.status(201);
                res.json(product);
            }
           
        })
       
        
    },
    delete:function(req,res){
        var id=req.params.id;
        Product.findByIdAndRemove(id,function(err){
            if(!err){
                res.status(204);
                res.send("Product deleted Successfully");
            }
            else{
                res.status(500);
                res.send(err);
            }
        })
    }
}