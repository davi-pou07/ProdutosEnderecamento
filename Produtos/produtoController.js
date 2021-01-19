const express = require("express");
const router = express.Router();
const Produto = require("../DataBases/Produto");
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

module.exports = router;