
const cors = require('cors');
const { response } = require("express");
const restorants = require("../models/restorantekle.model");
const bcrypt = require('bcrypt');
const AppiError = require("../utils/errors");
const Response = require("../utils/response");
const { createToken,tokenControl } = require('../middlewares/auth');


const firmakayit = async (req, res) => {

    
    try {
         
        const { rapikey } = req.body;

        const yToken = await createToken({ rapikey }, res);

        const restorant = { ...req.body, token: yToken };

        const restorantt = new restorants(restorant);

        await restorantt.save()
            .then((response) => {
                return new Response(response, "Restorant başarıyla oluşturuldu")
                    .created(res);
            })
            .catch((err) => {
            
                throw new AppiError("Restorant oluşturulurken bir hata oluştu", 500);
            });

    } catch (err) {
        console.error(err);
        return new Response(null, err.message).error(res);
    }
};


module.exports = { firmakayit};