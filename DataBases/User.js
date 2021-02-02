const Sequelize = require("sequelize")
const connection = require("./databases")

const User =  connection.define('users',{
    login:{
        type: Sequelize.STRING,
        allowNull: false
        //Slug é o nome editavel que sairia o titulo para ultilizar na rota por exemplo
    },senha: {
        type: Sequelize.STRING,
        allowNull: false
    }
})


//Arquivo foi removido para não tentar criar toda vez que o projeto rodar
User.sync({force:false}).then(()=>{console.log("usuario ok")})

module.exports= User