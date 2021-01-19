//Estou dizendo para ele criar uma variavel que requisita o expres e declaro uma variavel app que chama a função do express
const express = require('express')
const app = express()
const session = require("express-session")
//Estou configurando o bodyParser que é o que tras os dadso inseridos no formulario
const bodyParser = require("body-parser")
//Exportando conexão
const connection = require('./DataBases/databases')
const Produto = require("./DataBases/Produto")
const produtoController = require("./Produtos/produtoController")
const Enderecamento = require("./DataBases/Enderecamento")
//exportando model de ciração de tabelos no banco



//databases
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com sucesso")
    })
    .catch((msgErro) => {
        console.log(msgErro)
    })

//usar o EJS como view engine | renderizador de html
app.set('view engine', 'ejs')
//Carregamento de arquivos estaticos no express
app.use(express.static('public'))
//Carregamento do bodyPerser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//rotas
app.use("/",produtoController)

//session
app.use(session({
    secret:"sdfsdfsdfgdfgfgh",
    cookie:{maxAge:1800000000}
}))



app.listen(8080, () => {
    console.log("Servidor rodando!")
})