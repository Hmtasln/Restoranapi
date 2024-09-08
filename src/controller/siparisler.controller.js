const cors = require('cors');
const { response } = require("express");
const yepposmodel = require("../models/yep_online_orders.model");
const bcrypt = require('bcrypt');
const AppError = require("../utils/errors");
const Response = require("../utils/response");
const { createToken, tokenControl } = require('../middlewares/auth');

const Siparis = async (req, res) => {
    
    try {
        const sipariler = { ...req.body };
            console.log(req.body.id);
            const siparis = await yepposmodel.findOne({
                online_orders_gt_id: sipariler.id  
           });
           console.log(siparis);

        return new Response(siparis, " siparisler listelendi.").success(res);

    } catch (err) {
        console.error(err);
        return new Response(null, err.message).error(res);
    } 
};
module.exports = { Siparis };