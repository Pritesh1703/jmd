var User=require('../models/user.model');
var bcrypt=require('bcrypt');
var jwt=require('jsonwebtoken');
var config=require('../utilities/config');

module.exports={
    signup:function(req,res){

        var hash=bcrypt.hashSync(req.body.password,2);
        req.body.password=hash;
        var user=new User(req.body);
       
        user.save()
        .then(function(users){

            var jsonUsers=users.toJSON();
            delete jsonUsers.password;
            res.status(200);       
            res.json(jsonUsers);
        })
        .catch(function(err){

            if(err && err.errmsg && err.errmsg.indexOf("duplicate key error") > -1){
                res.status(500);
                res.send("UserName already exists.Please sign in");
            }
            else{
                res.status(500);
                res.send(err);
            }
           
        })
        
    },
    signin:function(req,res){

        User.findOne({username: req.body.username})
        .exec()
        .then(function(user){
            if(user){
                var result=bcrypt.compareSync(req.body.password,user.password);
                if(result){
                    res.status(200);
                    var token=jwt.sign({username: req.body.username},config.password,{expiresIn: config.expiry});
                    var response={
                        username: req.body.username,
                        token: token
                    };
                    res.json(response);
                }
                else{
                    res.status(401);
                    res.send("unauthorized");
                }
                
            }
            else{
                res.status(401);
                res.send("unauthorized");
            }
        })
        .catch(function(err){
            res.status(401);
            res.send("unauthorized");
        })
        
    }
}