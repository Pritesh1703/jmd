var userCtrl=require('../controllers/user.ctrl');
var jwt=require('jsonwebtoken');
var config=require('../utilities/config');

function isAuthenticated(req,res,next){

    var authHeader=req.headers["authorization"];
    if(authHeader){
        jwt.verify(authHeader,config.password,function(err,success){
            if(success){
                next();
            }
            else{
                res.status(401);
                res.send("Bad Credentials.You Are not authorized to access this API.")
            }
        })
    }
    else{
        res.status(401);
        res.send("Unauthorized5");
    }

    // var authHeader=req.headers["authorization"];
    // var tokens=authHeader.split(" ");
    // var decodedHeader=new Buffer(tokens[1],"base64");
    // var decodedStr=decodedHeader.toString();
    // var credentials=decodedStr.split(":");

    // userCtrl.signin(credentials[0],credentials[1],function(err){
    //     if(!err){
    //         next();
    //     }
    //     else{
    //         res.status(401);
    //         res.send("Bad Credentials.You Are not authorized to access this API"); 
    //     }
    // })
  
   
}

module.exports=isAuthenticated;