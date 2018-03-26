module.exports={
    get:function(req,res){
        var products=[{id:1,brand:"Nokia",model:3220,price:5000,inStock:true},
        {id:2,brand:"Apple",model:"iPhone7",price:50000,inStock:true},
        {id:3,brand:"Samsung",model:"note4",price:10000,inStock:false},
        {id:4,brand:"Mi",model:"A1",price:15000,inStock:true}];
    
        res.status(200);
        res.json(products);
    }
}