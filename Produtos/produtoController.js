const express = require("express");
const router = express.Router();
const Enderecamento = require("../DataBases/Enderecamento");
const Tabela = require("../DataBases/Tabela")
const Produto = require("../DataBases/Produto")
const slugify = require("slugify");




router.get("/admin/produtos/novo",(req, res) => {
    res.render("admin/produtos/new");
});

router.post("/produto/save", (req, res) => {
    var nome = req.body.nome;
    var descricao = req.body.descricao;
    var preco = req.body.preco;
    var quantidade = req.body.quantidade;
    var status = req.body.status

    var resp= req.body.resp

    console.log(nome,descricao,preco,quantidade,status)
    if(nome || preco || quantidade || status != undefined ){
	Produto.create({
		nome:nome,
		descricao:descricao,
		preco:preco,
		quantidade:quantidade,
		status:status,
		slug:slugify(nome),
	}).then(produto =>{
        if (resp == "S") {
            res.redirect("/admin/enderecamento/novo/"+produto.id)
        } else {
            res.redirect("/admin/produtos")
        }
	})
    }else{
        res.redirect("/admin/produtos/novo")
    }
});

//Vizualizar produtos

router.get("/admin/produtos",(req,res)=>{
    Produto.findAll().then(produtos =>{
        res.render("admin/produtos/index",{produtos:produtos})
    })
})

// router.get("/admin/produtos/:id",(req,res)=>{
//     var id = req.params.id
//     Produto.findByPk(id).then(produto =>{
//         Enderecamento.findOne({where:{produtoId:id}}).then(endereco => {
//             Tabela.findOne({where:{id:endereco.tabelaId}})
//         }).then(tabelinha =>{
//             res.render("/admin/produtos/produto",{produto:produto,endereco:endereco,tabelinha:tabelinha})
//         })
//     })
// })
router.get("/admin/produtos/:id",(req,res)=>{
    var id = req.params.id
    Produto.findByPk(id).then(produto =>{
        Enderecamento.findOne({
            where:{produtoId : id}
        }).then(endereco =>{
            console.log(endereco)
            Tabela.findOne({
                where:{id : endereco.tabelaId}
            }).then(tabelinha =>{
                res.render("admin/produtos/produto",{produto:produto,endereco:endereco,tabelinha:tabelinha})
            })
        })
    })
})

module.exports = router;