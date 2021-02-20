const express = require("express");
const router = express.Router();
const Tabela = require("../DataBases/tabela");
const Enderecamento = require("../DataBases/Enderecamento")
const adminAuth = require("../middlewares/adminAuth")

router.get("/admin/tabela/novo",adminAuth, (req, res) => {
    res.render("admin/tabela/new")
})
router.post("/tabela/save", (req, res) => {
    var nome_rua = req.body.nome_rua
    var q_coluna = req.body.q_coluna
    var q_nivel = req.body.q_nivel
    Tabela.create({
        nome_rua: nome_rua,
        q_coluna: q_coluna,
        q_nivel: q_nivel,
    }).then((tabela) => {
        Enderecamento.create({
            tabelaId:tabela.id
        })
        res.redirect("/admin/tabela/novo")
    })
})

router.get("/admin/tabelas",adminAuth, (req, res) => {
    Tabela.findAll().then(tabela => {
        res.render("admin/tabela/index", { tabela: tabela })
    }).catch(err =>{
        res.send("Nenhuma tabela cadastrada")
    }).then(()=>{
        res.redirect("/admin/tabela/novo")
    })
})

router.post("/tabela/delete",adminAuth, (req, res) => {
    var idtabela = req.body.idtabela
    if (idtabela == undefined) {
        if (!isNaN(idtabela)) {
            Tabela.destroy({ where: { id: idtabela } }).then(() =>{ res.redirect("/admin/tabelas")})
        }else{
            setTimeout(() => {
                res.send("Ops! Erro, não encontramos nenhuma tabela com esse ID")
            }, 80000);
            res.redirect("/admin/tabelas")
        }
    }else{
            res.redirect("/admin/tabelas")
    }
})

module.exports = router