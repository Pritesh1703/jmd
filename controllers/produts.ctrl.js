var products=[{id:1,brand:"Nokia",model:3220,price:5000,inStock:true},
{id:2,brand:"Apple",model:"iPhone7",price:50000,inStock:true},
{id:3,brand:"Samsung",model:"note4",price:10000,inStock:false},
{id:4,brand:"Mi",model:"A1",price:15000,inStock:true}];


module.exports={
    get:function(req,res){
    
        res.status(200);
        res.json(products);
    },
    getById:function(req,res){
        var id=+req.params.id;
        var product;
        for(i=0;i<products.length;i++){
            if(products[i].id===id){
                product=products[i];
                break;
            }
        }
        if(product){
            res.status(200);
            res.json(product );
        }
        else{
            res.status(404);
            res.send("Product not found");
        }
       
    },
    save:function(req,res){
        products.push(req.body);
        res.status(201);
        res.json(req.body);
    }
}