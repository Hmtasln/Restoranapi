const cors = require('cors');
const { response } = require("express");
const users = require("../models/user.model");
const bcrypt = require('bcrypt');
const AppiError = require("../utils/errors");
const Response = require("../utils/response");
const { createToken } = require('../middlewares/auth');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const userInfo = await users.findOne({ email });
       
        if (!userInfo)
            throw new AppiError("Email ya da Şifre Hatalıdır!", 401);

        const comparePassword = await bcrypt.compare(password, userInfo.password);

        if (!comparePassword)
            throw new AppiError("Email ya da Şifre Hatalıdır!", 401);

        const yToken = await createToken(userInfo, res);

        // Token'ı güncelle
        await users.updateOne({ email: email }, { $set: { token: yToken } });

        console.log("Güncellendi");

        return new Response(userInfo, "Kullanıcı başarıyla giriş yaptı").success(res);
    } catch (err) {
        console.error(err);
        return new Response(null, err.message).error(res);
    }
}

const register = async (req, res) => {
    try {
        const { email, phone } = req.body;

        const userCheck = await users.findOne({ email: email, phone: phone });

        if (userCheck) {
            throw new AppiError("Girmiş olduğunuz email adresi veya telefon zaten kayıtlı olabilir.", 401);
        }

        req.body.password = await bcrypt.hash(req.body.password, 8);

        const yToken = await createToken({ email }, res);

        const uuser = { ...req.body, token: yToken };

        const user = new users(uuser);

        await user.save()
            .then((response) => {
                return new Response(response, "Kullanıcı başarıyla oluşturuldu")
                    .created(res);
            })
            .catch((err) => {
                console.log("NE geliyor " + err);
                throw new AppiError("Kullanıcı oluşturulurken bir hata oluştu", 500);
            });

    } catch (err) {
        console.error(err);
        return new Response(null, err.message).error(res);
    }
}

const me = async (req, res) => {
    return new Response(req.user, "Kullanıcı bilgileri başarıyla getirildi").success(res);
}



module.exports = { login, register, me };

