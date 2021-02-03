const express = require("express");
const router = express.Router();
const Enderecamento = require("../DataBases/Enderecamento");
const Tabela = require("../DataBases/Tabela")
const Produto = require("../DataBases/Produto")
const adminAuth = require("../middlewares/adminAuth")

router.get("/admin/enderecamento/novo/:idprod",adminAuth,(req, res) => {
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
    var endereco = req.body.endereco
    var n_nivel = endereco.split(" - ")[1]
    var n_coluna = endereco.split(" - ")[0]
    console.log(n_nivel,n_coluna)
    Enderecamento.create({
        coluna: n_coluna,
        nivel: n_nivel,
        // sequencia: n_sequencia,
        endereco:endereco,
        tabelaId: tabelaId,
        produtoId:produtoId
    }).then(() => {
        res.redirect("/admin/tabelas")
    })
})

// router.get("/admin/enderecamento/edit/:idprod",(req,res)=>{
//     id = req.params.id
//     if (id != undefined) {
//         Enderecamento.findOne({where:{produtoId:id}},{include:[{model:Tabela}]}).then(endereco => {
//             res.render("admin/enderecamento/edit", {endereco: endereco })
//         })
//     } else {
//         req.redirect("/admin/enderecos")
//     }
// })

router.get("/admin/enderecamento/edit/:idprod", (req, res) => {
    var idprod = req.params.idprod
    Tabela.findAll().then((tabelas) => {
        Produto.findByPk(idprod).then(produto => {
            Tabela.findOne({order:[['id','DESC']]}).then(tabelinha => {
                res.render("admin/enderecamento/edit", { tabelas: tabelas, produto: produto, tabelinha:tabelinha })
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
    console.log(n_nivel,n_coluna)
    Enderecamento.update({
        coluna: n_coluna,
        nivel: n_nivel,
        // sequencia: n_sequencia,
        endereco:endereco,
        tabelaId: tabelaId,
        produtoId:produtoId
    },{where:{produtoId : produtoId}}).then(() => {
        res.redirect("/admin/produtos/"+produtoId)
    })
})

module.exports = router