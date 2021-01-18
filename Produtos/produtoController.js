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
    var codBar = req.body.codBar;
    var status = req.body.status
    if(nome || preco || quantidade || status != undefined ){
	Produto.create({
		nome:nome,
		descricao:descricao,
		preco:preco,
		quantidade:quantidade,
		codBar:codBar,
		status:status,
		slug:slugify(nome),
	}).then(()=>{
		res.redirect("/admin/produtos")
	})
    }else{
        res.redirect("/admin/produtos/novo")
    }
});

module.exports = router;