// Mongoose modülünü içe aktar
const mongoose = require('mongoose');

// Kullanıcı modeli için bir şema tanımla
const restorantSchema = new mongoose.Schema({
    // 'name' alanını tanımla: String tipinde, zorunlu ve otomatik olarak boşlukları kırpılacak
    firmaadi: {
        type: String,
        required: true,
        trim: true
    },
    // 'lastname' alanını tanımla: String tipinde, zorunlu ve otomatik olarak boşlukları kırpılacak
    restorantadi: {
        type: String,
        required: true,
        trim: true
    },
    // 'email' alanını tanımla: String tipinde, zorunlu, benzersiz ve otomatik olarak boşlukları kırpılacak
    rapikey: { 
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    // 'phone' alanını tanımla: Number tipinde, zorunlu, benzersiz ve otomatik olarak boşlukları kırpılacak
    rsceretkey: {
        type: String,
        required: false,
        trim: true,
        unique: true
    },
    // 'password' alanını tanımla: String tipinde, zorunlu ve otomatik olarak boşlukları kırpılacak
    rkullaniciadi: {
        type: String,
        required: false,
        trim: true
    },
    token:{
        type: String,
        trim:true, 
        unique: true
    }
    // Şema seçenekleri: 'users' koleksiyonunu kullan ve zaman damgalarını etkinleştir
}, { collection: 'restorant', timestamps: true });

// 'User' modelini 'users' şeması ile oluştur
const Restorant = mongoose.model('Restorant', restorantSchema);

// Modeli dışa aktar
module.exports = Restorant;
