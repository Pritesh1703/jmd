var express=require('express');
var bodyParser=require('body-parser');
var defaultRouter=require('./routes/default.router');
var productsRouter=require('./routes/products.router');

var app=express();

app.listen(3000,function(){
    console.log("Server is running on port 3000");
});

app.use(bodyParser.json());

app.use('/',defaultRouter);
app.use('/api/products',productsRouter);