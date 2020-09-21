let DB_URI="mongodb://localhost:27017/microservices"

if (process.env.MONGO_DB_URI){
    DB_URI=process.env.MONGO_DB_URI
}

SECRET_KEY='some_secret_secret';

module.exports={
    DB_URI,
    SECRET_KEY
}