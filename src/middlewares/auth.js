const jwt= require('jsonwebtoken');
const AppiError=require('../utils/errors');
const users=require("../models/user.model");
const createToken= async (user,res)=>{


    /* console.log("createToken",user); */

    var tarih = new Date();
  
    const payload={
            sub:user.id,
            name:user.name,
            tarih:tarih.getTime()
    }

    const token= await jwt.sign(payload,process.env.JWT_SECRET_KEY,{

        algorithm:'HS512',
        expiresIn:process.env.JWT_EXPIRES_IN

    });

    return  token ;

}

const tokenControl=async (req,res,next)=>{

    const headerToken=req.headers.authorization 
    && req.headers.authorization.startsWith('Bearer')
       

    if(!headerToken)
        throw new AppiError("Token bulunamadı",401);

    const token =req.headers.authorization.split(' ')[1];
    console.log("token",token);
    await jwt.verify(token,process.env.JWT_SECRET_KEY,async(err,decoded)=>{

        if(err) throw new AppiError("Token geçersiz",401);

        const usrInfo=await users.findById(decoded.sub).select('_id name lastname email');

        console.log("usrInfo",usrInfo);

        if(!usrInfo) throw new AppiError("Kullanıcı bulunamadı",401);
        req.user=usrInfo;
        next();
    })
   
}
module.exports={
    createToken,
    tokenControl

};