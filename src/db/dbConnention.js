const mongoose=require('mongoose');

mongoose.connect(process.env.DB_URL,{

    useNewUrlParser:true,
    useUnifiedTopology:true,
    //useCreateIndex:true,
    ///useFindAndModify:false
}).then(()=>{
    console.log('Database bağlandısı başarılı');
}).catch((err)=>{
    console.log('Database bağlatısı başarısız',err);
})