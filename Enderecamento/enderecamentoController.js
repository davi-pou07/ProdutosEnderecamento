const express = require("express");
const router = express.Router();
const Enderecamento = require("../DataBases/Enderecamento");
const Tabela = require("../DataBases/Tabela")
const Produto =  require("../DataBases/Produto")

router.get("/admin/enderecamento/novo/:id",(req,res)=>{
    var idprod = req.params.id
    Tabela.findAll().then((tabelas) =>{
        Produto.findByPk(idprod).then(produto =>{
            res.render("admin/enderecamento/new",{tabelas:tabelas,produto:produto})
        })
    })
    
})
router.post("/enderecamento/save",(req,res)=>{
    var produtoId = req.body.produtoId
    var tabelaId = req.body.produtoId
    var nome_rua = req.body.nome_rua
    var q_coluna = req.body.q_coluna
    var q_nivel = req.body.q_nivel
    var q_sequencia  = req.body.q_sequencia
    Enderecamento.create({
        nome_rua:nome_rua,
        q_coluna:q_coluna,
        q_nivel:q_nivel,
        q_sequencia:q_sequencia,
        tabelaId:tabelaId
    }).then(()=>{
        res.redirect("/admin/tabelas")
    })
})

module.exports = router