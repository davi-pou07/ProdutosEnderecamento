const express = require("express");
const router = express.Router();
const Enderecamento = require("../DataBases/Enderecamento");
const Tabela = require("../DataBases/Tabela")

router.get("/admin/enderecamento/novo",(req,res)=>{
    Tabela.findAll().then((tabelas) =>{
        res.render("admin/enderecamento/new",{tabelas:tabelas})
    })
    
})
router.post("/enderecamento/save",(req,res)=>{
    var nome_rua = req.body.nome_rua
    var q_coluna = req.body.q_coluna
    var q_nivel = req.body.q_nivel
    var q_sequencia  = req.body.q_sequencia
    Produto.create({
        nome_rua:nome_rua,
        q_coluna:q_coluna,
        q_nivel:q_nivel,
        q_sequencia:q_sequencia
    }).then(()=>{
        res.redirect("/admin/tabelas")
    })
})

module.exports = router