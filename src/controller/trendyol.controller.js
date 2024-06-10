const { response } = require("express");
const orders=require("../models/trendyol.model");
const bcrypt=require('bcrypt');
const AppiError = require("../utils/errors");
const Response = require("../utils/response");
const {createToken}=require('../middlewares/auth');


const createdOrder  =async (req, res) =>{

            const order = new orders(req.body);
            await order.save().then((response) =>{

                 return new Response(response,"Şipariş başarıyla oluşturuldu" )
                 .created(res); 

                 try {
                                      
                
                    // Trendyol API'sine POST isteği yap
                    const response = axios.post('https://stageapi.trendyol.com/integration/oms/meal', order, {
                      headers: {
                        
                        'Content-Type': 'application/json',
                            }
                    });
                
                    // Trendyol'dan gelen yanıtı döndür
                    res.status(200).json(response.data);
                  } catch (error) {
                    // Hata durumunda hata mesajını döndür
                    res.status(error.response.status).json({ message: error.message });
                  }
                 
            })
            .catch((err) =>{

                throw new AppiError("Sipariş oluşturulurken bir hata oluştu",500);

                console.log(error);
            });
    
 }

 module.exports = {createdOrder  };
