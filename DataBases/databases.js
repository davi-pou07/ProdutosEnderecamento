const Sequelize = require("sequelize");

const connection = new Sequelize('da1i1bcmrp89ss','ttsgwultjbdglu','d1e43edbcf3886c3f02ef798f177a2dcd35aa8edfcb8691d847ad2e4f00e085b',{
    host:'ec2-34-194-215-27.compute-1.amazonaws.com',
    dialect: 'postgres',
    //configurando timezone
    timezone: "-03:00",
    logging:false //Remove log do terminal
})
// mysql://b4be845f37ea68:295062e4@us-cdbr-east-03.cleardb.com/heroku_9b63551fa2f9a8f?reconnect=true
module.exports = connection;