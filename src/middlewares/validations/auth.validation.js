const joi= require('joi');
const AppiError = require("../../utils/errors");


class AuthValidation{

constructor(){}

    static  register=async(req,res,next)=>{
            try{

                    await joi.object({

                        name:joi.string().trim().min(3).max(100).required().messages({

                            "string.base":"İsim alanı metin tipinde olmalıdır",
                            "string.empty":"İsim alanı boş bırakılamaz !",
                            "string.min":"İsim alanı en az 3 karakter olmalıdır",
                            "string.max":"İsim alanı en fazla 100 karakter olmalıdır",
                            "string.required":"İsim alanı zorunludur"
                        }),
                        lastname:joi.string().trim().min(3).max(100).required().messages({

                            "string.base":"Soyad alanı metin tipinde olmalıdır",
                            "string.empty":"Soyad alanı boş bırakılamaz !",
                            "string.min":"Soyad alanı en az 3 karakter olmalıdır",
                            "string.max":"Soyad alanı en fazla 100 karakter olmalıdır",
                            "string.required":"Soyad alanı zorunludur"
                        }),
                        email:joi.string().email().trim().min(3).max(100).required().messages({

                            "string.base":"Email alanı metin tipinde olmalıdır",
                            "string.empty":"Email alanı boş bırakılamaz !",
                            "string.min":"Email alanı en az 3 karakter olmalıdır",
                            "string.max":"Email alanı en fazla 100 karakter olmalıdır",
                            "string.email":"Email alanı geçerli bir email adresi olmalıdır",
                            "string.required":"Email alanı zorunludur"

                        }),

                        phone: joi.string().trim().regex(/^[0-9]{10,15}$/).required().messages({
                            "string.pattern.base": "Telefon numarası geçerli bir formatta olmalıdır (10-15 rakam)",
                            "string.empty": "Telefon numarası boş bırakılamaz !",
                            "any.required": "Telefon numarası zorunludur"
                        }),

                        password:joi.string().trim().min(8).max(16).required().messages(

                           {
                            "string.base":"Şifre alanı metin tipinde olmalıdır",
                            "string.empty":"Şifre alanı boş bırakılamaz !",
                            "string.min":"Şifre alanı en az 8 karakter olmalıdır",
                            "string.max":"Şifre alanı en fazla 16 karakter olmalıdır",
                            "string.required":"Şifre alanı zorunludur"
                           }
                        )


                    }).validateAsync(req.body);

            }catch(error){

                if(error.details && error?.details[0]?.message)

                    throw new AppiError(error.details[0].message,400);
                    else throw new AppiError("Bilgileri kontrol ediniz !",400);
                

                   }

            next()
    }

    static login=async(req,res,next)=>{


            try {

                await joi.object({
                
                    email:joi.string().email().trim().min(3).max(100).required().messages({

                        "string.base":"Email alanı metin tipinde olmalıdır",
                        "string.empty":"Email alanı boş bırakılamaz !",
                        "string.min":"Email alanı en az 3 karakter olmalıdır",
                        "string.max":"Email alanı en fazla 100 karakter olmalıdır",
                        "string.email":"Email alanı geçerli bir email adresi olmalıdır",
                        "string.required":"Email alanı zorunludur"

                    }),
                    password:joi.string().trim().min(8).max(16).required().messages(

                       {
                        "string.base":"Şifre alanı metin tipinde olmalıdır",
                        "string.empty":"Şifre alanı boş bırakılamaz !",
                        "string.min":"Şifre alanı en az 8 karakter olmalıdır",
                        "string.max":"Şifre alanı en fazla 16 karakter olmalıdır",
                        "string.required":"Şifre alanı zorunludur"
                       }
                    )
                    }).validateAsync(req.body);
                
            } catch(error){

                if(error.details && error?.details[0]?.message)

                    throw new AppiError(error.details[0].message,400);
                    else throw new AppiError("Bilgileri kontrol ediniz !",400);
                    }
                    next()

    }
}

module.exports=AuthValidation;