var express=require('express');
var defaultCtrl=require('../controllers/default.ctrl');
var productCtrl=require('../controllers/produts.ctrl');
var router=express.Router();

router.get('/products',productCtrl.get);

module.exports=router;