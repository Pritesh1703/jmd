var express=require('express');
var defaultCtrl=require('../controllers/default.ctrl');
var productCtrl=require('../controllers/produts.ctrl');
var router=express.Router();

router.get('/',productCtrl.get);
router.get('/:id',productCtrl.getById);
router.post('/',productCtrl.save);

module.exports=router;