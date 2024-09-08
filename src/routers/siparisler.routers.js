 
 const router=require('express').Router();

 const {login,register,me}=require('../controller/siparisler.controller');

 const authValidation =require('../middlewares/validations/auth.validation');

 const {tokenControl}=require('../middlewares/auth');

 router.post('/siparisler',authValidation.login,login);


 module.exports=router; 