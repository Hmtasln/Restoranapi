const router = require('express').Router();

const { createdOrder } = require('../../controller/trendyol.controller');

const authValidation = require('../../middlewares/validations/auth.validation');

const { tokenControl } = require('../../middlewares/auth');

// Sadece path kısmını belirtin, tam URL değil.
router.post('/integration/oms/meal', tokenControl, authValidation, createdOrder);

module.exports = router;
