const cors = require('cors');
const express = require('express');
const crypto = require('crypto');
const axios = require('axios'); 
const migrosSchema = require('../models/migros.model');
const bcrypt = require('bcrypt');
const AppiError = require('../utils/errors');
const Response = require('../utils/response');
const { createToken } = require('../middlewares/auth');
var aes256 = require('aes256');
var AES = require("crypto-js/aes");
const padder = require('pkcs7-padding');
// AES-256 şifreleme fonksiy


function encode(text, skey) {
  try{
    const padded = padder.pad(text, 16);  // 16 byte = 128 bit Block Size
    var cipher = crypto.createCipheriv('aes-256-ecb', skey, ''); // 256 bit Key Size
    cipher.setAutoPadding(false);
    var encrypted = cipher.update(padded, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    //console.log(encrypted);
    return encrypted;
  }catch (error) {
    console.error("Encryption error:", error);
    throw error;
  }

}


const GetDefinedActiveRestaurantApiKeys = async (req, res) => {
    
  
   try {
    
     
    // Migros API'sine POST isteği yap
    
    const response = await axios.post(`${process.env.MIGROS_API}/Store/GetDefinedActiveRestaurantApiKeys`, req.body, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    console.log(req.body);
    // Gelen yanıtı döndür
    //res.status(200).json(response.data);
    return new Response(response.data).success(res);
  } catch (error) {
    
    if (error.response) {
      // Axios hatası
      res.status(error.response.status).json({ message: error.message });
    
    } else {
      // Diğer hatalar
      res.status(500).json({ message: "Sipariş oluşturulurken bir hata oluştu" });
    }
  }
}


const activeOrdersWithStores = async (req, res) => {
  

 
  const RestaurantApiKeys = new migrosSchema(req.body);
  try {
    const secretKey=`${process.env.MIGROS_API_SECRET_KEY}`;
    const savedRestaurantApiKeys = await RestaurantApiKeys.save();
    const arry = {
      "value": encode(JSON.stringify(req.body), secretKey)
  }
    // Migros API'sine POST isteği yap
    const response = await axios.post(`${process.env.MIGROS_API}/Order/ActiveOrdersWithStores`, JSON.stringify(arry), {
      headers: {
        'Content-Type': 'application/json',
        'XApiKey':'wzZQ70aKaXyBS7pGGhwIfF36YU0a2AWQ4b7SewlQTFI='
      }
    });
    
    // Gelen yanıtı döndür
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
    if (error.response) {
      // Axios hatası
     
      res.status(error.response.status).json({ message: error.message });
    } else {
      // Diğer hatalar
      res.status(500).json({ message: "Sipariş oluşturulurken bir hata oluştu" });
    }
  }
}

const pendingOrdersWithStores = async (req, res) => {
  
const RestaurantApiKeys = new migrosSchema(req.body);

const secretKey=`${process.env.MIGROS_API_SECRET_KEY}`;
const Apikey="d312c5da-66b4-46eb-94fb-8089def96d7a";

  //const encryptedPlainText=aes256.encrypt(req.body,secretKey); 
 
  const arry = {
      "value": encode(JSON.stringify(req.body), secretKey)
  }
    
   
  
 
  try {
    const savedRestaurantApiKeys = await RestaurantApiKeys.save();
     
// Migros sipariş listesi 

   
    const response = await axios.post(`${process.env.MIGROS_API}/Order/PendingOrdersWithStores`,JSON.stringify(arry), {

      headers: {
        'Content-Type': 'application/json',
        'XApiKey':'wzZQ70aKaXyBS7pGGhwIfF36YU0a2AWQ4b7SewlQTFI='
      } 

    });
  
    // Gelen yanıtı döndür
  
    //console.log("asdasdsad",response);
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
   /// console.log(error.response);
    if (error.response) {
      // Axios hatası
      
      res.status(error.response.status).json({ message: error.message });
    } else {
      // Diğer hatalar
      res.status(500).json({ message: "Sipariş oluşturulurken bir hata oluştu" });
    }
  }
}


const GetPassiveOrders= async (req,res)=>{

  console.log("sadasd",req);
  try {
    const savedRestaurantApiKeys = await RestaurantApiKeys.save();

  const response = await axios.post(`${process.env.MIGROS_API}/Order/GetPassiveOrders`, savedRestaurantApiKeys, {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  // Gelen yanıtı döndür
  res.status(200).json(response.data);
} catch (error) {
  if (error.response) {
    // Axios hatası
    res.status(error.response.status).json({ message: error.message });
  } else {
    // Diğer hatalar
    res.status(500).json({ message: "Sipariş oluşturulurken bir hata oluştu" });
  }
}

}
module.exports = { GetDefinedActiveRestaurantApiKeys,activeOrdersWithStores,pendingOrdersWithStores}
