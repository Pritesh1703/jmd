var ctrl={
    get:function(req,res){
        res.send("Hello Express");
    },

    health:function(req,res){
        var status={status:"UP"};
        res.json(status);
    }
}
module.exports=ctrl;