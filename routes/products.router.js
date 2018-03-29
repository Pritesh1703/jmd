var express=require('express');
var defaultCtrl=require('../controllers/default.ctrl');
var productCtrl=require('../controllers/produts.ctrl');
var reviewCtrl=require('../controllers/review.ctrl');
var router=express.Router();

router.get('/',productCtrl.get);
router.get('/:pageIndex/:pageSize',productCtrl.get);
router.get('/:id',productCtrl.getById);
router.post('/',productCtrl.save);
router.put('/:id',productCtrl.update);
router.delete('/:id',productCtrl.delete);
router.post('/review',reviewCtrl.save);


module.exports=router;