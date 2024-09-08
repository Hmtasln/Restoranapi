const express = require('express');
const router = express.Router();

const authRouter = require('./auth.routers');
const restotantRouter = require('./restorantekle.routers');
const migrosRouter = require('./migros/routers');
const getirRouter = require('./getir/routers');
const getirRouter = require('./siparisler.routers');

// authRouter'ı /auth yolunda kullan
router.use(restotantRouter);
router.use(authRouter);

// migrosRouter'ı /migros yolunda kullan

router.use(migrosRouter);

router.use(getirRouter);

module.exports = router;
  