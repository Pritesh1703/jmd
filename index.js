var express=require('express');
var app=express();
app.listen(3000,function(){
    console.log("Server is running on port 3000");
});


app.get('/',function(req,res){
    res.send("Hello Express");
})

app.get('/health',function(req,res){
    var status={status:"UP"};
    res.json(status);
})

app.get('/products',function(req,res){
    var products=[{id:1,brand:"Nokia",model:3220,price:5000,inStock:true},
    {id:2,brand:"Apple",model:"iPhone7",price:50000,inStock:true},
    {id:3,brand:"Samsung",model:"note4",price:10000,inStock:false},
    {id:4,brand:"Mi",model:"A1",price:15000,inStock:true}];

    res.status(200);
    res.json(products);
})