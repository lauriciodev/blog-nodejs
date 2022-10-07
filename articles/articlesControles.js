const express = require("express");
const router = express.Router();
const categoriesModel = require("../categories/categoriesModel");
const articlesModel = require("../articles/articlesModel");
const slugify = require("slugify");

router.get("/admin/articles",(req,res) =>{
  articlesModel.findAll({
    include:[{model:categoriesModel}]
  }).then( articles =>{
        res.render("admin/articles/index",{
      articles:articles
    });
  })
});

//formulario para novo artigo
router.get("/admin/articles/new",(req,res) =>{
  categoriesModel.findAll().then( categories =>{
    res.render("admin/articles/new",{
      categories:categories 
    });
  })
});

//salvando artigos
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

//delete articles 
router.post("/articles/delete",(req,res) => {
  let id = req.body.id;
  if(id != undefined){
   if (!isNaN(id)) {
       articlesModel.destroy({
         where:{
           id:id
         }
       }).then(() =>{
         res.redirect("/admin/articles");
       })
   }else{
     res.redirect("/admin/articles");
   }
    
  }else{
   res.redirect("/admin/articles");
  }
 });

module.exports = router;
