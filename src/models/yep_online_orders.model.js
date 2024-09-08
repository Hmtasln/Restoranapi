// Mongoose modülünü içe aktar
const { string, number } = require('joi');
const mongoose = require('mongoose');

// Kullanıcı modeli için bir şema tanımla
const yep_online_ordersSchema = new mongoose.Schema({
    // 'name' alanını tanımla: String tipinde, zorunlu ve otomatik olarak boşlukları kırpılacak
    online_orders_gt_id: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    // 'lastname' alanını tanımla: String tipinde, zorunlu ve otomatik olarak boşlukları kırpılacak
    online_orders_customers_gt_id: {
        type: String,
        required: false,
        trim: true,
        unique: true
    },
    // 'email' alanını tanımla: String tipinde, zorunlu, benzersiz ve otomatik olarak boşlukları kırpılacak
    online_orders_no: { 
        type: String,
        required: false,
        trim: true,
        unique: true
    },
    // 'phone' alanını tanımla: Number tipinde, zorunlu, benzersiz ve otomatik olarak boşlukları kırpılacak
    online_orders_token: {
        type: String,
        required: false,
        trim: true,
        unique: true
    },
    // 'password' alanını tanımla: String tipinde, zorunlu ve otomatik olarak boşlukları kırpılacak
    online_orders_details_uniq_id: {
        type: String,
        required: false,
        trim: true,
        unique: true
    },
    online_orders_company_id:{
        type: String,
        trim:true, 
        unique: true
    },
    online_orders_days_id:{
        type: String,
        trim:true, 
        unique: true
    },online_orders_customers_id:{
        type: String,
        trim:true, 
        unique: true
    },online_orders_users_id:{
        type: String,
        trim:true, 
        unique: true
    },online_orders_payment_type:{
        type: Number,
        trim:true, 
        unique: true
    },online_orders_delivery_type:{
        type: Number,
        trim:true, 
        unique: true
    },online_orders_customers_adress_id:{
        type: String,
        trim:true, 
        unique: true
    },online_orders_note:{
        type: String,
        
    },online_orders_total:{
        type: String,
        required: false,
        trim:true, 
        unique: true
    },online_orders_status:{
        type: String,
        required: false,
        trim:true, 
        unique: true
    },online_orders_source:{
        type: String,
        required: false,
        trim:true, 
        unique: true
    },online_orders_date:{
        type: String,
        trim:true, 
        unique: true
    },online_orders_currencies_id:{
        type: String,
        required: false,
        trim:true, 
        unique: true
    },online_orders_discount:{
        type: String,
        required: false,
        trim:true, 
        unique: true
    },online_orders_gt_phone_code:{
        type: String,
        required: false,
        trim:true, 
        unique: true
    },online_orders_gt_confirmationId:{
        type: String,
        required: false,
        trim:true, 
        unique: true
    },online_orders_gt_status:{
        type: String,
        trim:true, 
        unique: true
    },online_orders_full_orders:{
        type: String,
        required: false,
        trim:true, 
        unique: true
    },online_orders_location_lat:{
        type: String,
        trim:true, 
        unique: true
    },online_orders_location_lon:{
        type: String,
        trim:true, 
        unique: true
    },online_orders_scheduledDate:{
        type: String,
        required: false,
        trim:true, 
        unique: true
    },online_orders_couriers_type:{
        type: String,
        required: false,
        trim:true, 
        unique: true
    } ,online_orders_stores_id:{
        type: String,
        required: false,
        trim:true, 
        unique: true
    },online_orders_integrations_id:{
        type: String,
        required: false,
        trim:true, 
        unique: true
    },online_orders_row_number:{
        type: String,
        required: false,
        trim:true, 
        unique: true
    },
    // Şema seçenekleri: 'users' koleksiyonunu kullan ve zaman damgalarını etkinleştir
}, { collection: 'yep_online_orders', timestamps: true });

// 'User' modelini 'users' şeması ile oluştur
const yep_online_orders = mongoose.model('yep_online_orders', yep_online_ordersSchema);

// Modeli dışa aktar
module.exports = yep_online_orders;
