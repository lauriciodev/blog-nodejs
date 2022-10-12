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



 //atualizar artigo
 router.get("/articles/update/:id",(req,res) =>{
  let id = req.params.id
  articlesModel.findByPk(id).then(articles =>{
    categoriesModel.findAll().then(categories =>{
      res.render("admin/articles/edit",{
        articles:articles,
        categories:categories
      })
     
    })
  });
   
});

router.post("/articles/update", (req,res) =>{
  let title = req.body.title
  let body = req.body.body
  let id = req.body.id
  let categories = req.body.categories
 articlesModel.update({
  title:title,
  body:body,
  slug:slugify(title),
  categoriId:categories
 },{
  where:{
    id:id
  }
 }).then(() =>{
  res.redirect("/admin/articles");
 }).catch(erro =>{
  res.redirect("/")
 })
});



router.get("/articles/page/:num",(req,res) =>{
  let page = req.params.num;
  let offset = 0

 if(isNaN(page) || page == 1){
  offset = 0

 }else{
  offset = parseInt(page) * 4;
 }
 

  articlesModel.findAndCountAll({
    limit:4,
    offset:offset
  }).then(articles =>{

    let next;

    if(offset + 4 >= articles.count){
      next = false;
    }else{
      next = true;
    }
  
    let result = {
      next:next,
      articles:articles
    }


    res.json(result);
  })
});





module.exports = router;
