const express = require("express");
const router = express.Router();

router.get("/categories",(req,res) =>{
  res.send("rota de categorias")
});

router.get("/adm/categories/new",(req,res) =>{
  res.send('rota para criação de rotas');
});

module.exports = router;