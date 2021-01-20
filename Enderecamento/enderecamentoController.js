const express = require("express");
const router = express.Router();
const Enderecamento = require("../DataBases/Enderecamento");
const Tabela = require("../DataBases/Tabela")
const Produto = require("../DataBases/Produto")

router.get("/admin/enderecamento/novo/:idprod", (req, res) => {
    var idprod = req.params.idprod
    Tabela.findAll().then((tabelas) => {
        Produto.findByPk(idprod).then(produto => {
            Tabela.findOne({order:{'id':'DESC'}}).then(tabelinha => {
                res.render("admin/enderecamento/new", { tabelas: tabelas, produto: produto, tabelinha:tabelinha })
            })
        })
    })

})
router.get("/admin/enderecamento/novo/:idProd/:idTab", (req, res) => {
    var idprod = req.params.idProd
    var idTab = req.params.idTab
    Tabela.findAll().then((tabelas) => {
        Produto.findByPk(idprod).then(produto => {
            Tabela.findByPk(idTab).then(tabelinha => {
                res.render("admin/enderecamento/new", { tabelinha: tabelinha, tabelas: tabelas, produto: produto })
            })
        })
    })
})

router.post("/enderecamento/save", (req, res) => {
    var produtoId = req.body.produtoId
    var tabelaId = req.body.produtoId
    var nome_rua = req.body.nome_rua
    var q_coluna = req.body.q_coluna
    var q_nivel = req.body.q_nivel
    var q_sequencia = req.body.q_sequencia
    Enderecamento.create({
        nome_rua: nome_rua,
        q_coluna: q_coluna,
        q_nivel: q_nivel,
        q_sequencia: q_sequencia,
        tabelaId: tabelaId
    }).then(() => {
        res.redirect("/admin/tabelas")
    })
})

module.exports = router