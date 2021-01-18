const express = require("express");
const router = express.Router();
const Produto = require("../DataBases/Produto");
const slugify = require("slugify");


router.get("/admin/produtos/novo",(req, res) => {
    res.render("admin/produtos/new");
});

// router.post("/produto/save", (req, res) => {
//     var nome = req.body.nome;
//     var descricao = req.body.descricao;
//     var preco = req.body.preco;
    
//     if(title != undefined){
        
//         Category.create({
//             title: title,
//             slug: slugify(title)
//         }).then(() => {
//             res.redirect("/admin/categories");
//         })

//     }else{
//         res.redirect("/admin/categories/new");
//     }
// });

module.exports = router;