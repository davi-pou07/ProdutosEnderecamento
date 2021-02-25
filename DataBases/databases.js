const Sequelize = require("sequelize");

const connection = new Sequelize('heroku_9b63551fa2f9a8f','b4be845f37ea68','295062e4',{
    host:'us-cdbr-east-03.cleardb.com',
    dialect: 'mysql',
    //configurando timezone
    timezone: "-03:00",
    logging:false //Remove log do terminal
})
// mysql://b4be845f37ea68:295062e4@us-cdbr-east-03.cleardb.com/heroku_9b63551fa2f9a8f?reconnect=true
module.exports = connection;