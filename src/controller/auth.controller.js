 
const { response } = require("express");
const users=require("../models/user.model");
const bcrypt=require('bcrypt');
const AppiError = require("../utils/errors");
const Response = require("../utils/response");
const {createToken}=require('../middlewares/auth');
 
 const login =async (req, res) =>{
    const {email,password}=req.body;
    const userInfo = await users.findOne({email})

    if(!userInfo)
      throw new AppiError("Email yada Şİfre Hatalıdır !",401);

    const comparePassword = await bcrypt.compare(password, userInfo.password);
     if(!comparePassword)
       throw new AppiError("Email yada Şİfre Hatalıdır !",401);

     createToken(userInfo,res);
    
 }

 const register =async (req, res) =>{


    const {email,phone}= req.body;
       
    const userCheck = await users.findOne({ phone: phone, email: email });

    

    if(userCheck){
       
      throw new AppiError("Girmiş oduğunuz email adresi  veya  telefon zaten kayıtlı olabilir.",401);

    }
     req.body.password= await bcrypt.hash(req.body.password, 8);

     console.log("hash şifreleme : ",req.body.password);
               
            const user = new users(req.body);
            await user.save()
            .then((response) =>{

                 return new Response(response,"Kullanıcı başarıyla oluşturuldu" )
                 .created(res); 
            })
            .catch((err) =>{

                throw new AppiError("Kullanıcı oluşturulurken bir hata oluştu",500);

                console.log(error);
            });
    
 }

 const me=async (req,res)=>{

    
    return new Response(req.user,"Kullanıcı bilgileri başarıyla getirildi").success(res);

 }

 module.exports = { login, register,me };