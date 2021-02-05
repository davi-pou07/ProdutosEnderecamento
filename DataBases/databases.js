const Sequelize = require("sequelize");

const connection = new Sequelize('produtosEnderecamento','root','davi6259',{
    host:'localhost',
    dialect: 'mysql',
    //configurando timezone
    timezone: "-03:00",
    logging:false //Remove log do terminal
})

module.exports = connection;