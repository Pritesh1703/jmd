var ctrl={
    get:function(req,res){
        res.status(200)
        .send("Hello Express");
    },

    health:function(req,res){
        var status={status:"UP"};
        res.status(200);
        res.json(status);
    }
}
module.exports=ctrl;