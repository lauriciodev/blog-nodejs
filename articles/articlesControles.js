const express = require("express");
const router = express.Router();

router.get("/articles",(req,res) =>{
  res.send("rota de artigos")
});

router.get("/admin/articles/new",(req,res) =>{
  res.send('rota para criação de artigos');
});

module.exports = router;
