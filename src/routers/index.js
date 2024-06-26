const express = require('express');
const router = express.Router();

const authRouter = require('./auth.routers');
const migrosRouter = require('./migros/migros.routers');

// authRouter'ı /auth yolunda kullan
router.use(authRouter);

// migrosRouter'ı /migros yolunda kullan
router.use(migrosRouter);

module.exports = router;
