const router = require('express').Router();

const { GetDefinedActiveRestaurantApiKeys,activeOrdersWithStores,pendingOrdersWithStores} = require('../../controller/migros.controller');

const authValidation = require('../../middlewares/validations/auth.validation');

const { tokenControl } = require('../../middlewares/auth');


router.post('/GetDefinedActiveRestaurantApiKeys', GetDefinedActiveRestaurantApiKeys);
router.post('/activeOrdersWithStores', activeOrdersWithStores);
router.post('/pendingOrdersWithStores',pendingOrdersWithStores);

module.exports = router;
