const Sequelize = require("sequelize")
const connection = require("./databases")

const Tabela = connection.define("tabela",{
    nome_rua:{
        type:Sequelize.STRING,
        allowNull:false
    },
    q_coluna:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    q_nivel:{
        type:Sequelize.INTEGER,
        allowNull:false
    }
})

Tabela.sync({force: false}).then(()=>{
    console.log("Tabela ok")//Criar a minha tabela sempre que eu criar a minha aplicação
})

module.exports= Tabela