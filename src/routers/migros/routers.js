const router = require('express').Router();

const { activeRestaurantApiKey } = require('../../controller/migros.controller');

//const authValidation = require('../../middlewares/validations/auth.validation');

const { tokenControl } = require('../../middlewares/auth');

//console.log("migros router");

router.post('/activeRestaurantApiKey', activeRestaurantApiKey);

module.exports = router;
