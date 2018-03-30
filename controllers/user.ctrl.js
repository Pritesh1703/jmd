var User=require('../models/user.model');
var bcrypt=require('bcrypt');

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
    signin:function(username,password,done){

        User.findOne({username: username})
        .exec()
        .then(function(user){
            if(user){
                var result=bcrypt.compareSync(password,user.password);
                if(result){
                    done(null);
                }
                else{
                   done("Bad Credentials");
                }
                
            }
            else{
                done("Bad Credentials");
            }
        })
        .catch(function(err){
            done("Bad Credentials");
        })
        
    }
}