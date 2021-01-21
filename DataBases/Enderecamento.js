const Sequelize = require("sequelize")
const connection = require("./databases")
const Tabela = require("./Tabela")

const Enderecamento = connection.define('enderecamentos',{
	coluna:{
		type:Sequelize.INTEGER,
		allowNull:true
	},
	nivel:{
		type:Sequelize.INTEGER,
		allowNull:true
	},
	sequencia:{
		type:Sequelize.STRING,
		allowNull:true
	},
	produtoId:{
		type:Sequelize.INTEGER,
		allowNull:true
	}
})

//Ligação 1 p 1
Enderecamento.belongsTo(Tabela) //Um enderecamentos pertence a uma Produto

Enderecamento.sync({force: false}).then(()=>{
    console.log("enderecamentos ok")//Criar a minha tabela sempre que eu criar a minha aplicação
})

module.exports= Enderecamento