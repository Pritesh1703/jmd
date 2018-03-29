var Product = require('../models/product.model');
var Review=require('../models/review.model');

module.exports={
    get:function(req,res){
        console.log(req.query);
        var count=0;
        var pageIndex= +req.params.pageIndex || 0;
        var pageSize= +req.params.pageSize || 2 ;   
        var sortBy=req.query.sort || 'lastUpdated';
        var sortDirection=(req.query.sortDirection).toLowerCase()==='asc'?"":"-";     

        Product.count().exec()
        .then(function(cnt){
            count=cnt;
            var query=Product.find({},{'__v':0})
                .skip(pageSize * pageIndex)
                .limit(pageSize)
                .sort(sortDirection + sortBy);

            return query.exec();
                     
        })
        .then(function(products){
            var response={
             metadata:{totalRecords:count,numberOfPages:Math.ceil(count/pageSize)},
             data:products
         }
         res.status(200);
         res.json(response);   
      })
      .catch(function(err){console.log(err)});

      
    },
    getById:function(req,res){
        var id = req.params.id;
        Product.findById(id,{'__v':0})
        .exec()
        .then(function(product){
        
                if(product){

                    Review.find({productId:id})
                    .exec()
                    .then(function(reviews){
                        
                        var jsonProduct=product.toJSON();
                        jsonProduct.reviews=reviews;
                        res.status(200);
                        res.json(jsonProduct);
                    })
                   
                }
                else{
                    res.status(404);
                    res.send("Product Not found");
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