const express = require("express");
const router = express.Router();
const Produto = require("../DataBases/Produto");
const Tabela = require("../DataBases/tabela");

router.get("/admin/tabela/novo",(req,res)=>{
    res.render("admin/tabela/new")
})
router.post("/tabela/save",(req,res)=>{
    var nome_rua = req.body.nome_rua
    var q_coluna = req.body.q_coluna
    var q_nivel = req.body.q_nivel
    var q_sequencia  = req.body.q_sequencia
    Tabela.create({
        nome_rua:nome_rua,
        q_coluna:q_coluna,
        q_nivel:q_nivel,
        q_sequencia:q_sequencia
    }).then(()=>{
        res.redirect("/admin/tabela/novo")
    })
})

module.exports = router