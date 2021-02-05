const express = require("express");
const router = express.Router();
const Enderecamento = require("../DataBases/Enderecamento");
const Tabela = require("../DataBases/Tabela")
const Produto = require("../DataBases/Produto")
const adminAuth = require("../middlewares/adminAuth")

router.get("/admin/enderecamento/novo/:idprod", adminAuth, (req, res) => {
    var idprod = req.params.idprod
    Tabela.findAll().then((tabelas) => {
        Produto.findByPk(idprod).then(produto => {

            Tabela.findOne({ order: [['id', 'DESC']] }).then(tabelinha => {
                res.render("admin/enderecamento/new", { tabelas: tabelas, produto: produto, tabelinha: tabelinha })
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
    var endereco = req.body.endereco
    var n_nivel = endereco.split(" - ")[1]
    var n_coluna = endereco.split(" - ")[0]
    Enderecamento.create({
        coluna: n_coluna,
        nivel: n_nivel,
        // sequencia: n_sequencia,
        endereco: endereco,
        tabelaId: tabelaId,
        produtoId: produtoId
    }).then(() => {
        res.redirect("/admin/tabelas")
    })
})

router.get("/admin/enderecamento/edit/:idprod", (req, res) => {
    var idprod = req.params.idprod
    Tabela.findAll().then((tabelas) => {
        Produto.findByPk(idprod).then(produto => {
            Tabela.findOne({ order: [['id', 'DESC']] }).then(tabelinha => {
                res.render("admin/enderecamento/edit", { tabelas: tabelas, produto: produto, tabelinha: tabelinha })
            })
        })
    })

})

router.get("/admin/enderecamento/edit/:idProd/:idTab", (req, res) => {
    var idprod = req.params.idProd
    var idTab = req.params.idTab
    Tabela.findAll().then((tabelas) => {
        Produto.findByPk(idprod).then(produto => {
            Tabela.findByPk(idTab).then(tabelinha => {
                res.render("admin/enderecamento/edit", { tabelinha: tabelinha, tabelas: tabelas, produto: produto })
            })
        })
    })
})

router.post("/enderecamento/update", (req, res) => {
    var produtoId = req.body.produtoId
    var tabelaId = req.body.tabelaId
    var endereco = req.body.endereco
    var n_nivel = endereco.split(" - ")[1]
    var n_coluna = endereco.split(" - ")[0]
    console.log(n_nivel, n_coluna)
    Enderecamento.update({
        coluna: n_coluna,
        nivel: n_nivel,
        // sequencia: n_sequencia,
        endereco: endereco,
        tabelaId: tabelaId,
        produtoId: produtoId
    }, { where: { produtoId: produtoId } }).then(() => {
        res.redirect("/admin/produtos/" + produtoId)
    })
})

// <<<<<<<<<<<<<<<<<<<<<< COM ERROS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
router.get("/admin/enderecos/", (req, res) => {
    tabelaId =  req.body.tabelaId
    Tabela.findAll().then(tabelas => {
        Enderecamento.findAll().then(enderecos => {
            Produto.findAll().then(produtos => {
                Tabela.findOne().then(tabelinha => {
                    res.render("admin/enderecamento/index", { tabelas: tabelas, enderecos: enderecos, produtos: produtos, tabelinha: tabelinha })
                }).catch(err => {
                    res.send("tabela não encontrado")
                })
            }).catch(err => {
                res.send("Produto não encontrado")
            })
        }).catch(err => {
            res.send("Endereço não encontrado")
        })
    }).catch(err => {
        res.send("Tabela não encontrada")
    })
})

router.get("/admin/enderecos/:tabelaId", (req, res) => {
    var tabelaId = req.params.tabelaId
    Tabela.findAll().then(tabelas => {
        Enderecamento.findOne({ where: { tabelaId: tabelaId } }).then(endereco => {
            Produto.findAll({ where: { id: endereco.produtoId } }).then(produtos => {
                Tabela.findByPk(tabelaId).then(tabelinha => {
                    res.render("admin/enderecamento/index", { tabelas: tabelas, endereco: endereco, produtos: produtos, tabelinha: tabelinha })
                }).catch(err => {
                    res.send("Produto não encontrado")
                })
            }).catch(err => {
                res.send("Produto não encontrado")
            })
        }).catch(err => {
            res.send("Endereço não encontrado")
        })
    }).catch(err => {
        res.send("Tabela não encontrada")
    })
})

module.exports = router