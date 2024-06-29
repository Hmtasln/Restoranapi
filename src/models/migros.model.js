// Mongoose modülünü içe aktar
const mongoose = require('mongoose');

const GetDefinedActiveRestaurantApiKeys = new mongoose.Schema({
    secretKey: {
        type: String,
        required: true,
        trim: true
    },
    
  });

 /*  const StoreIds=new mongoose.Schema({
    storeIds:{
        type: Number,
        required: true
    }
  });
  const PendingOrdersWithStores =new mongoose.Schema({
  
        orders:{    
            storeIds: [StoreIds],
            offset: Number,
            limit: Number
        },
    });
    const orderSchema = new mongoose.Schema({
        GetDefinedActiveRestaurantApiKeys: GetDefinedActiveRestaurantApiKeys,
        PendingOrdersWithStores:PendingOrdersWithStores
      }); */
  const ApiKeys = mongoose.model('orderSchema', GetDefinedActiveRestaurantApiKeys);

// Modeli dışa aktar
module.exports = ApiKeys;