// Mongoose modülünü içe aktar
const mongoose = require('mongoose');

const GetDefinedActiveRestaurantApiKeys = new mongoose.Schema({
    secretKey: {
        type: String,
        required: true,
        trim: true
    },
    
  });

  const StoreIds=new mongoose.Schema({
    storeIds:{
        type: Number,
        required: true
    }
  });
  const PendingOrdersWithStores =new mongoose.Schema({
  
    orders:{    
         storeIds: [
            StoreIds
        ],
        offset: 0,
        limit: 0
    },
          });

  const ApiKeys = mongoose.model('secretKey', GetDefinedActiveRestaurantApiKeys);

// Modeli dışa aktar
module.exports = ApiKeys;