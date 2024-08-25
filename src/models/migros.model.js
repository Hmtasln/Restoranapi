// Mongoose modülünü içe aktar
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GetDefinedActiveRestaurantApiKeys = new Schema({
    secretKey: {
        type: String,
        required: true,
        trim: true
    },
});

const StoreIds = new Schema({
    storeIds: {
        type: Number,
        required: true
    }
});

const PendingOrdersWithStores = new Schema({
    orders: {
        storeIds: [StoreIds],
        offset: Number,
        limit: Number
    },
});

/// ActiveRestaurantApiKeySchema Başlangıç

const ActiveRestaurantApiKeySchema = new Schema({
    
        storeIds: [StoreIds],
        offset: Number,
        limit: Number
      
});
/// ActiveRestaurantApiKeySchema Bitiş


const GetPassiveOrders=new Schema({

    storeIds: [StoreIds],
    offset: Number,
    limit: Number

});


const orderSchema = new Schema({
    GetDefinedActiveRestaurantApiKeys: GetDefinedActiveRestaurantApiKeys,
    PendingOrdersWithStores: PendingOrdersWithStores,
    ActiveRestaurantApiKeySchema: ActiveRestaurantApiKeySchema,GetPassiveOrders
},{ collection: 'migrosSchema', timestamps: true });

const migrosSchema = mongoose.model('migrosSchema', orderSchema);

// Modeli dışa aktar
module.exports = migrosSchema;
