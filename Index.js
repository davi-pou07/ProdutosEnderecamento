//Estou dizendo para ele criar uma variavel que requisita o expres e declaro uma variavel app que chama a função do express
const express = require('express')
const app = express()
//Estou configurando o bodyParser que é o que tras os dadso inseridos no formulario
const bodyParser = require("body-parser")
//Exportando conexão
const connection = require('./DataBases/databases')
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




app.listen(8080, () => {
    console.log("Servidor rodando!")
})