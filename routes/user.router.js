var express=require('express');
var userCtrl=require('../controllers/user.ctrl');

var router=express.Router();

router.post('/signup',userCtrl.signup);
router.post('/signin',userCtrl.signin);

module.exports=router;