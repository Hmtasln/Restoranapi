 
 const router=require('express').Router();

 const {firmakayit}=require('../controller/firmaekle.controller');

 //const authValidation =require('../middlewares/validations/auth.validation');

 //const {tokenControl}=require('../middlewares/auth');

 //router.post('/login',authValidation.login,login);

 router.post('/firmaekle',firmakayit);

 ///router.get("/me",tokenControl,me)

 module.exports=router; 