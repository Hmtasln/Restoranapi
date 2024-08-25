const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Adres alt şeması
const AddressSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
  },
  address: String,
  aptNo: String,
  floor: String,
  doorNo: String,
  city: String,
  district: String,
  description: String
});

// Konum alt şeması
const LocationSchema = new Schema({
  lat: Number,
  lon: Number
});

// Ürün alt şeması
const ProductSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
  },
  imageURL: String,
  wideImageURL: String,
  count: Number,
  product: String,
  name: {
    tr: String,
    en: String,
  },
   price: Number,
  optionPrice: Number,
  priceWithOption: Number,
  totalPrice: Number,
  totalOptionPrice: Number,
  totalPriceWithOption: Number,
  optionCategories: [Schema.Types.Mixed],
  displayInfo: {
    title: {
      tr: String,
      en: String
    },
    options: {
      tr: [Schema.Types.Mixed],
      en: [Schema.Types.Mixed]
    }
  },
  note: String,
  discountedPriceWithOption: Number,
  totalDiscountedPriceWithOption: Number
});

// Ana şema
const getirSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
  },
  status: {
 type: String,  
  },
  isScheduled: Boolean,
  confirmationId: String,
  client: {
    id: {
      type: Schema.Types.ObjectId,
    },
    name: String,
    contactPhoneNumber: String,
    clientPhoneNumber: String,
    deliveryAddress: AddressSchema,
    location: LocationSchema
  },
  courier: {
    id: {
      type: Schema.Types.ObjectId,
    },
    status: {
      type: String
    },
   type: String,
    location: LocationSchema
  },
  products: [ProductSchema],
  clientNote: String,
  doNotKnock: Boolean,
  dropOffAtDoor: Boolean,
  totalPrice: Number,
  totalDiscountedPrice: Number,
  checkoutDate: Date,
  deliveryType: Number,
  isEcoFriendly: Boolean,
  paymentMethod: Number,
  paymentMethodText: {
    en: String,
    tr: String
  },
  restaurant: {
    id: {
      type: Schema.Types.ObjectId,
    },
    name: String,
    brand: Schema.Types.Mixed
  },
  isQueued: Boolean
});

module.exports = mongoose.model('yep_online_orders', getirSchema);

