const Sequelize = require("sequelize")
const connection = require("./databases")

const Produto = connection.define('produtos',{
	nome:{
		type:Sequelize.STRING,
		allowNull: false
	},
	descricao:{
		type:Sequelize.STRING,
		allowNull: false
	},
	preco:{
		type:Sequelize.FLOAT,
		allowNull: false
	},
	quantidade:{
		type:Sequelize.INTEGER,
		allowNull: false
	},
	slug:{
		type:Sequelize.STRING,
		allowNull: false
	},
	status:{
		type:Sequelize.STRING,
		allowNull: false
	}
})


//Procedimento.hasMany(Operacao)//Uma categoria tem muitos artigos
//Ligação 1 p 1
//Operacao.belongsTo(Procedimento) //Um artigo pertence a uma categoria
//Arquivo foi removido para não tentar criar toda vez que o projeto rodar
Produto.sync({force: false}).then(()=>{
    console.log("Produtos ok")//Criar a minha tabela sempre que eu criar a minha aplicação
})

module.exports= Produto