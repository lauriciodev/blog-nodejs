const express = require("express");
const categorieModel = require('../categories/categoriesModel');
const router = express.Router();
const categoriesModel = require("../categories/categoriesModel");
const articlesModel = require("../articles/articlesModel");
const slugify = require("slugify");

router.get("/admin/articles",(req,res) =>{
  res.send("rota de artigos")
});

router.get("/admin/articles/new",(req,res) =>{
  categorieModel.findAll().then( categories =>{
    res.render("admin/articles/new",{
      categories:categories
    });
  })
});

router.post("/articles/save",(req,res)=>{
  let title = req.body.title;
  let body = req.body.body;
  let categories = req.body.categories;

  articlesModel.create({
    title:title,
    slug:slugify(title),
    body:body,
    categoryId:categories
  }).then(() =>{
    res.redirect("/admin/articles")
  })

});

module.exports = router;
