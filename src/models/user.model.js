// Mongoose modülünü içe aktar
const mongoose = require('mongoose');

// Kullanıcı modeli için bir şema tanımla
const userSchema = new mongoose.Schema({
    // 'name' alanını tanımla: String tipinde, zorunlu ve otomatik olarak boşlukları kırpılacak
    name: {
        type: String,
        required: true,
        trim: true
    },
    // 'lastname' alanını tanımla: String tipinde, zorunlu ve otomatik olarak boşlukları kırpılacak
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    // 'email' alanını tanımla: String tipinde, zorunlu, benzersiz ve otomatik olarak boşlukları kırpılacak
    email: { 
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    // 'phone' alanını tanımla: Number tipinde, zorunlu, benzersiz ve otomatik olarak boşlukları kırpılacak
    phone: {
        type: Number,
        required: true,
        trim: true,
        unique: true
    },
    // 'password' alanını tanımla: String tipinde, zorunlu ve otomatik olarak boşlukları kırpılacak
    password: {
        type: String,
        required: true,
        trim: true
    },
    // Şema seçenekleri: 'users' koleksiyonunu kullan ve zaman damgalarını etkinleştir
}, { collection: 'users', timestamps: true });

// 'User' modelini 'users' şeması ile oluştur
const User = mongoose.model('User', userSchema);

// Modeli dışa aktar
module.exports = User;
