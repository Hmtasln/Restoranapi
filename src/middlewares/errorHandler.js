const AppiError=require('../utils/errors');

const errorHandler = (err, req, res, next) => {

    if(err instanceof AppiError){
        return res.status(err.statusCode || 400).json({
            success:false,
            message:err.message
        });


    }
    
    return res.status(500).json({
        success:false,
        message:" Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz."
    });
}

module.exports = errorHandler;