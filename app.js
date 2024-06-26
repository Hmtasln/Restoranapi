require('express-async-errors');
const express = require('express');
const app = express();

// .env dosyasından ortam değişkenlerini yükle
require('dotenv').config();

// Veritabanı bağlantısını başlat
require('./src/db/dbConnention');

// Portu .env dosyasındaki değere veya varsayılan olarak 5001'e ayarla
const port = process.env.PORT || 5001;
// Kök URL için bir GET istek yönlendiricisi tanımla
app.get('/', (req, res) => {
  res.json({ message: "Hello World!" });
});
// Routers klasöründeki tüm rotaları yükle
const authRouter = require('./src/routers/auth.routers');
const trendyolRouter = require('./src/routers/trendyol/routers');
const migrosRouter = require('./src/routers/migros/routers');

// Hata işleyiciyi yüklüyoruz
const errorHandler = require('./src/middlewares/errorHandler');

// Api Injection güveliği
const mongoSanitize = require('express-mongo-sanitize');

// Middlewareler tanımlanıyor
app.use(express.json());
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit:'50mb',extended:true, parametreLimit:50000}));

app.use(
  mongoSanitize({
    replaceWith: '_',
  }),
);

// /api rotasına authRouter'ı bağla
app.use("/api", authRouter);
app.use("/trendyol", trendyolRouter);
app.use("/migros", migrosRouter);


// Hata yakalama middleware'ini kullanılıyor
app.use(errorHandler);

// Belirtilen portta sunucuyu başlat ve dinle
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 


