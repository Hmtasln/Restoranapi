const router = require('express').Router();

const { getirSiparis,getirIptalSiparis} = require('../../controller/getir.controller');

//const authValidation = require('../../middlewares/validations/auth.validation');

//const { tokenControl } = require('../../middlewares/auth');


router.post('/neworder', getirSiparis);
router.post('/cancelorder', getirIptalSiparis);



module.exports = router;
