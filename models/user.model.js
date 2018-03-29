var mongoose=require('mongoose');

module.exports=mongoose.model('User',{
     username: {type:String,required:[true,"UserName required"],unique:true},
     password:  {type:String,required:true,validate:{
         validator:function(val){
                return val.length>6;
         },
         message:"Password must be greater than 6 characters"
     }},
     lastUpdated :  {type:Date,default:Date.now()},
     active:  {type:Boolean,default:true}
})