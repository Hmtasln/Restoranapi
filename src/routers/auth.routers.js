 
 const router=require('express').Router();

 const {login,register,me}=require('../controller/auth.controller');

 const authValidation =require('../middlewares/validations/auth.validation');

 const {tokenControl}=require('../middlewares/auth');

 router.post('/login',authValidation.login,login);

 router.post('/register',authValidation.register,register);

 router.get("/me",tokenControl,me)

 module.exports=router; 