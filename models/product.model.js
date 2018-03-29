var mongoose=require('mongoose');

var model=mongoose.model('Product',
{
    brand: {type:String,required:true},
    model: {type:String,required:true},
    price: {type:Number,required:true},
    inStock:{type:Boolean,required:true},
    lastUpdated:{type:Date,default:Date.now()}
});

module.exports=model; 