const express = require("express");
const router = express.Router();
const User = require("../DataBases/User");
//npm install --save bcryptjs
const bcrypt = require("bcryptjs")


router.get("/admin/user/novo",(req,res)=>{
    res.render("admin/user/new")
})

router.post("/user/novo",(req,res)=>{
    var login = req.body.login
    var senha = req.body.senha
    User.findOne({where:{login:login}}).then(user =>{
        if(user == undefined){
            var salt = bcrypt.genSaltSync(10)
            var hash = bcrypt.hashSync(senha,salt)
            User.create({
                login:login,
                senha:hash
            }).then(()=>{
                res.redirect("/")
            }).catch(err =>{
                res.redirect("/")
            })
        }else{
            res.redirect("/admin/user/novo")
        }
    })
})

router.get("/login",(req,res)=>{
    res.render("admin/users/login")
})

router.post("/autenticate",(req,res)=>{
    email=req.body.email
    password=req.body.password
    
    User.findOne({where:{email:email}}).then(user =>{
        if(user!=undefined){
            //validar senha
            var correct = bcrypt.compareSync(password,user.password)
            if (correct) {
                req.session.user = {
                    id:user.id,
                    email:user.email
                }
                // res.json(req.session.user)
                res.redirect("/admin/articles")
            } else {
                res.redirect("/login")
            }
        }else{
            res.redirect("/login")
        }
    })
})

router.get("/logout",(req,res)=>{
    req.session.user = undefined
    res.redirect("/")
})

module.exports = router