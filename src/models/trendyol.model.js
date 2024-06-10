// Mongoose modülünü içe aktar
const mongoose = require('mongoose');

// Kullanıcı modeli için bir şema tanımla
const ingredientOptionSchema = new mongoose.Schema({
    id: Number,
    name: String,
    price: { type: Number, default: 0 }
  });
  
  const modifierProductSchema = new mongoose.Schema({
    ingredientOptions: {
      exclude: [ingredientOptionSchema],
      include: [ingredientOptionSchema]
    },
    modifierGroupId: Number,
    modifierProducts: [this], // Kendi referansını içerecek şekilde recursive bir yapı
    name: String,
    price: { type: Number, default: 0 },
    productId: Number
  });
   
  const productSchema = new mongoose.Schema({
    productId: Number,
    productName: String
  });
  
  const lineItemSchema = new mongoose.Schema({
    ingredientOptions: {
      exclude: [ingredientOptionSchema],
      include: [ingredientOptionSchema]
    },
    modifierProducts: [modifierProductSchema],
    product: productSchema,
    quantity: { type: Number, default: 0 }
  });
  
  const addressSchema = new mongoose.Schema({
    addressDescription: String,
    addressText: String,
    apartmentNumber: Number,
    city: String,
    company: String,
    district: String,
    doorNumber: Number,
    email: String,
    floor: Number,
    latitude: Number,
    longitude: Number,
    neighborhood: String,
    phone: { type: String, match: /^\d{10}$/ } // 10 haneli sayısal string
  });
  
  const customerSchema = new mongoose.Schema({
    customerFirstName: String,
    customerLastName: String,
    note: String
  });
  
  const storeSchema = new mongoose.Schema({
    deliveryType: String,
    storeId: Number,
    supplierId: Number
  });
  
  const couponSchema = new mongoose.Schema({
    amount: { type: Number, default: 0 },
    name: String,
    sellerCoverageRatio: Number
  });
  
  const promotionSchema = new mongoose.Schema({
    amount: { type: Number, default: 0 },
    name: String,
    sellerCoverageRatio: Number
  });
  
  const paymentSchema = new mongoose.Schema({
    isPaidWithMealCard: { type: Boolean, default: false },
    mealCardType: { type: String, default: "" }
  });
  
  const orderSchema = new mongoose.Schema({
    address: addressSchema,
    customer: customerSchema,
    lines: [lineItemSchema],
    store: storeSchema,
    coupon: couponSchema,
    promotions: [promotionSchema],
    payment: paymentSchema
  });

// 'Sipariş' modelini 'createdOrder' şeması ile oluştur
const Orders = mongoose.model('createdOrder', orderSchema);

// Modeli dışa aktar
module.exports = Orders;
