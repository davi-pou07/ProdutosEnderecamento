const Sequelize = require("sequelize");

const connection = new Sequelize('d3918lsvq94fe','kqainbgfpqbbzz','34d884cbb7a86c957cf388c99ea462f2c2d7616094f9b753ea59de093c21031f',{
    host:'ec2-34-203-255-149.compute-1.amazonaws.com',
    dialect: 'postgres',
    //configurando timezone
    timezone: "-03:00",
    logging:false //Remove log do terminal
})
// mysql://b4be845f37ea68:295062e4@us-cdbr-east-03.cleardb.com/heroku_9b63551fa2f9a8f?reconnect=true
module.exports = connection;