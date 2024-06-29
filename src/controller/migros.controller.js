const express = require('express');
const crypto = require('crypto');
const axios = require('axios');
const migrosSchema = require('../models/migros.model');
const bcrypt = require('bcrypt');
const AppiError = require('../utils/errors');
const Response = require('../utils/response');
const { createToken } = require('../middlewares/auth');

const activeRestaurantApiKey = async (req, res) => {
  
  
  const RestaurantApiKeys = new migrosSchema(req.body);
  try {
    const savedRestaurantApiKeys = await RestaurantApiKeys.save();

    // Migros API'sine POST isteği yap
    const response = await axios.post(`${process.env.MIGROS_API}/Store/GetDefinedActiveRestaurantApiKeys`, savedRestaurantApiKeys, {
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

const pendingOrdersWithStores = async (req, res) => {
  
  console.log("sadasd",req);
  const RestaurantApiKeys = new migrosSchema(req.body);
  try {
    const savedRestaurantApiKeys = await RestaurantApiKeys.save();

    // Migros sipariş listesi
    const response = await axios.post(`${process.env.MIGROS_API}/Order/PendingOrdersWithStores`, savedRestaurantApiKeys, {
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
module.exports = { activeRestaurantApiKey,pendingOrdersWithStores }
