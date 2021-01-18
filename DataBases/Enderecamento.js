const Sequelize = require("sequelize")
const connection = require("./databases")
const Produto = require("./Produto.js")

const Enderecamento = connection.define('enderecamentos',{
	rua:{
		type:Sequelize.STRING,
		allowNull:true
	},
	coluna:{
		type:Sequelize.STRING,
		allowNull:true
	},
	nivel:{
		type:Sequelize.STRING,
		allowNull:true
	},
	sequencia:{
		type:Sequelize.STRING,
		allowNull:true
	}
})

//Ligação 1 p 1
Enderecamento.belongsTo(Produto) //Um enderecamentos pertence a uma Produto

Enderecamento.sync({force: false}).then(()=>{
    console.log("enderecamentos ok")//Criar a minha tabela sempre que eu criar a minha aplicação
})

module.exports= Enderecamento