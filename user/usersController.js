const express= require("express");
const router = express.Router();
const User = require("./user");

router.get("/admin/users",(req,res) =>{
  res.send("listagemde usuarios");
})


router.get("/admin/users/create",(req,res) =>{
  res.render("admin/user/create")
})


module.exports = router;
