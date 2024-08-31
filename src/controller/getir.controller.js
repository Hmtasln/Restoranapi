const cors = require('cors');
const { response } = require("express");
const yepposmodel = require("../models/yep_online_orders.model");
const bcrypt = require('bcrypt');
const AppError = require("../utils/errors");
const Response = require("../utils/response");
const { createToken, tokenControl } = require('../middlewares/auth');

const getirSiparis = async (req, res) => {
    try {
        const getirsipariler = { ...req.body };

        await yepposmodel.insertMany([
            {
                online_orders_gt_id: req.body.id,
                online_orders_customers_gt_id: req.body.client.id,
               // online_orders_no: req.body.products.id,
               // online_orders_token: req.body.restaurant.id,
                //online_orders_details_uniq_id: req.body.id,
                online_orders_company_id: req.body.restaurant.id,
               /// online_orders_days_id: req.body.checkoutDate,
               // online_orders_users_id: req.body.client.id,
                online_orders_payment_type: req.body.paymentMethod,
                online_orders_delivery_type: req.body.deliveryType,
                online_orders_customers_adress_id: req.body.client.id,
                online_orders_note: req.body.clientNote,
                online_orders_status: req.body.status,
                online_orders_date: req.body.checkoutDate,
                online_orders_discount: req.body.products[0].discountedPriceWithOption, // İlk ürünün indirimli fiyatını kullanıyorum
                online_orders_gt_phone_code: req.body.client.clientPhoneNumber,
                online_orders_gt_confirmationId: req.body.confirmationId,
                online_orders_gt_status: req.body.status,
                online_orders_location_lat: req.body.client.location.lat,
                online_orders_location_lon: req.body.client.location.lon,
                online_orders_integrations_id: req.body.restaurant.id,
            }
        ]);

        return new Response(getirsipariler, "Getir siparisler eklendi.").success(res);

    } catch (err) {
        console.error(err);
        return new Response(null, err.message).error(res);
    } 
};

const getirIptalSiparis = async (req, res) => {
    try {
        const getirSiparis = { ...req.body };

        // Gerekli alanların varlığını kontrol et
        if (!getirSiparis.id || !getirSiparis.restaurant.id) {
            return res.status(400).send("Gerekli alanlar eksik");
        }

        // yepposmodel ve yep_online_orders'in tanımlı olduğunu kontrol et
       /*  if (!yepposmodel || !yepposmodel.yep_online_orders) {
            return res.status(500).send("Model yüklenemedi");
        }
 */
console.log(getirSiparis.id);

     //  const ssiparis= mongoose.collection("yep_online_orders")
        // Asenkron işlemi await ile bekleyin
        const siparis = await yepposmodel.findOne({
             online_orders_gt_id: getirSiparis.id  
        });

        console.log(siparis);
        // siparis'in varlığını kontrol et
       /*  if (!siparis) {
            return res.status(404).send("Sipariş bulunamadı");
        } */

        // İptal sebebini kontrol et ve logla
        if (getirSiparis.cancelReason && getirSiparis.cancelReason.cancelSource) {
            console.log(getirSiparis.cancelReason.cancelSource);
        }

        // Başarılı yanıt gönder
        res.status(200).send("Sipariş başarıyla iptal edildi");

    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};

module.exports = { getirSiparis, getirIptalSiparis };
