var Product = require('../models/product.model');

module.exports={
    get:function(req,res){
        
        var count=0;
        var pageIndex= +req.params.pageIndex || 0;
        var pageSize= +req.params.pageSize || 2 ;       

        Product.count(function(err,cnt){
            count=cnt;
            var query=Product.find({},{'__v':0})
                .skip(pageSize * pageIndex)
                .limit(pageSize)
                .sort("lastUpdated");

            query.exec(function(err,products){
                if(err){
                    res.status(500);
                    res.send(err);
                }
                else{
                    var response={
                        metadata:{totalRecords:count,numberOfPages:Math.ceil(count/pageSize)},
                        data:products
                    }
                    res.status(200);
                    res.json(response);
                }
               
            })


            // Product.find({},{'__v':0},function(err,products){
            //     if(err){
            //         res.status(500);
            //         res.send(err);
            //     }
            //     else{
            //         var response={
            //             metadata:{totalRecords:count,numberOfPages:Math.ceil(count/pageSize)},
            //             data:products
            //         }
            //         res.status(200);
            //         res.json(response);
            //     }
               
            // })
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
    },
    update:function(req,res){
        var id = req.params.id;
        Product.find(id,{$set: {brand: req.body.brand, model: req.body.model, price: req.body.price, inStock: req.body.inStock }},
            
            function(err,product){
            if(!err){
                res.status(200);
                res.json(product);
            }
            else{
                res.status(500);
                res.send(err);
            }
        })
    }
} 