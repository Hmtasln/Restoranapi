const router = require('express').Router();

const { activeRestaurantApiKey,pendingOrdersWithStores } = require('../../controller/migros.controller');

//const authValidation = require('../../middlewares/validations/auth.validation');

const { tokenControl } = require('../../middlewares/auth');

//console.log("migros router");

router.post('/activeRestaurantApiKey', activeRestaurantApiKey);
router.post('/pendingOrdersWithStores', pendingOrdersWithStores);

module.exports = router;
