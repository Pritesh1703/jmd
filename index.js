var express=require('express');
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
var defaultRouter=require('./routes/default.router');
var productsRouter=require('./routes/products.router');
var userRouter=require('./routes/user.router');
var isAuthenticated=require('./utilities/middleware');

var app=express();

var port=process.env.PORT || 3000 ;

app.listen(port,function(){
    console.log("Server is running on port:"+port);
});

mongoose.connect("mongodb://admin:admin@ds223019.mlab.com:23019/myproductsdb");
console.log("Connection to db succesfull");


app.use(bodyParser.json());

app.use('/',defaultRouter);
app.use('/api/users',userRouter);
//app.use(isAuthenticated);

app.use('/api/products',productsRouter);
