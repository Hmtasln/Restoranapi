const router=require('express').Router();

const authRouter=require('./auth.routers');

router.use(authRouter);

module.exports=router;