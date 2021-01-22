const express = require("express");
const router = express.Router();
const Enderecamento = require("../DataBases/Enderecamento");
const Tabela = require("../DataBases/Tabela")
const Produto = require("../DataBases/Produto")

router.get("/admin/enderecamento/novo/:idprod", (req, res) => {
    var idprod = req.params.idprod
    Tabela.findAll().then((tabelas) => {
        Produto.findByPk(idprod).then(produto => {
            Tabela.findOne({order:[['id','DESC']]}).then(tabelinha => {
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
    var tabelaId = req.body.tabelaId
    var n_nivel = req.body.n_nivel
    var n_coluna = req.body.n_coluna
    var n_sequencia = req.body.n_sequencia
    Enderecamento.create({
        coluna: n_coluna,
        nivel:n_nivel,
        sequencia: n_sequencia,
        tabelaId: tabelaId,
        produtoId:produtoId
    }).then(() => {
        res.redirect("/admin/tabelas")
    })
})

module.exports = router