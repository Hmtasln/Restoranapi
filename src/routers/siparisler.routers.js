 
 const router=require('express').Router();

 const {Siparis}=require('../controller/siparisler.controller');

 const authValidation =require('../middlewares/validations/auth.validation');

 const {tokenControl}=require('../middlewares/auth');

 router.post('/siparisler',Siparis);


 module.exports=router; 