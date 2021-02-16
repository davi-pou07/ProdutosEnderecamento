const express = require("express");
const router = express.Router();
const Enderecamento = require("../DataBases/Enderecamento");
const Tabela = require("../DataBases/Tabela")
const Produto = require("../DataBases/Produto")
const slugify = require("slugify");
const adminAuth = require("../middlewares/adminAuth")




router.get("/admin/produtos/novo",adminAuth,(req, res) => {
    res.render("admin/produtos/new");
});

router.post("/produto/save", (req, res) => {
    var nome = req.body.nome;
    var descricao = req.body.descricao;
    var preco = req.body.preco;
    var quantidade = req.body.quantidade;
    var status = req.body.status
    var resp = req.body.resp
    if (nome || preco || quantidade || status != undefined) {
        Produto.create({
            nome: nome,
            descricao: descricao,
            preco: preco,
            quantidade: quantidade,
            status: status,
            slug: slugify(nome),
        }).then(produto => {
            if (resp == "S") {
                res.redirect("/admin/enderecamento/novo/" + produto.id +"/"+ 1)
            } else {
                res.redirect("/admin/produtos")
            }
        })
    } else {
        res.redirect("/admin/produtos/novo")
    }
});

//Vizualizar produtos

router.get("/admin/produtos", (req, res) => {
    Produto.findAll().then(produtos => {
        res.render("admin/produtos/index", { produtos: produtos })
    }).catch(err =>{
        res.send("Nenhum produto cadastrado")
    })
})

router.get("/admin/produtos/:id", (req, res) => {
    var id = req.params.id
    Produto.findByPk(id).then(produto => {
        Enderecamento.findOne({
            where: { produtoId: id }
        }).then(endereco => {
            // console.log(endereco)
            // console.log(produto)
            Tabela.findOne({
                where: { id: endereco.tabelaId }
            }).then(tabelinha => {
                res.render("admin/produtos/produto", { produto: produto, endereco: endereco, tabelinha: tabelinha })
            }).catch(err =>{
                res.send("Nenhuma tabela encontrada para esse produto")
            })
        }).catch(err =>{
            res.send("Nenhum endereço cadastrado para esse produto")
        })
    }).catch(err =>{
        res.send("Nenhum produto cadastrado com esse id")
    })
})

router.get("/admin/produto/edit/:id",adminAuth, (req, res) => {
    id = req.params.id
    if (id != undefined) {
        Produto.findByPk(id).then(produto => {
            res.render("admin/produtos/edit", { produto: produto })
        }).catch(err =>{
            res.send("Nenhum produto cadastrado com esse ID")
        })
    } else {
        req.redirect("/admin/produtos")
    }
})

router.post("/produto/update", (req, res) => {
    var id = req.body.id
    var nome = req.body.nome;
    var descricao = req.body.descricao;
    var preco = req.body.preco;
    var quantidade = req.body.quantidade;
    var status = req.body.status
    var resp = req.body.resp

    Produto.update({ nome: nome, descricao: descricao, preco: preco, quantidade: quantidade, status: status }, {
        where: { id: id }
    }).then(() => {
        if(resp == 'S'){
            res.redirect("/admin/enderecamento/edit/"+id)
        }else {
        res.redirect("/admin/produtos/" + id)
    }
    }).catch(err =>{
        res.send("ID inexistente")
    })
    
})
module.exports = router;