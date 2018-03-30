var userCtrl=require('../controllers/user.ctrl');

function isAuthenticated(req,res,next){
    var authHeader=req.headers["authorization"];
   // console.log(req.headers);
    //console.log(authHeader);
    var tokens=authHeader.split(" ");
    var decodedHeader=new Buffer(tokens[1],"base64");
    var decodedStr=decodedHeader.toString();
    var credentials=decodedStr.split(":");

    userCtrl.signin(credentials[0],credentials[1],function(err){
        if(!err){
            next();
        }
        else{
            res.status(401);
            res.send("Bad Credentials.You Are not authorized to access this API"); 
        }
    })
  
   
}

module.exports=isAuthenticated;