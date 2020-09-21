let DB_URI="mongodb+srv://alarm:1234qwer1@cluster0.xnumo.mongodb.net/test?retryWrites=true&w=majority"

if (process.env.MONGO_DB_URI){
    DB_URI=process.env.MONGO_DB_URI
}

module.exports={
    DB_URI
}