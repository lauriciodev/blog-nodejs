const express = require("express");
const router = express.Router();
const categorieModel = require("./categoriesModel");
const slugify = require("slugify");
const { where } = require('sequelize');
const adminAuth = require("../middlewares/adminalth");

router.get("/admin/categories/new",adminAuth,(req,res) =>{
  res.render("admin/categories/new");
});

//create categories
router.post("/categories/save",(req,res) =>{
  let title = req.body.title;
  if(title != undefined && title != ""){
    categorieModel.create({
      title:title,
      slug:slugify(title)
    }).then(() =>{
      res.redirect("/admin/categories/");
    })
    
  }else{
    res.redirect("/admin/categories/new");
  }
})

//list categories
router.get("/admin/categories",adminAuth, (req,res) =>{
  categorieModel.findAll().then(categories =>{
  res.render("admin/categories/index",{
    categories:categories
  });
  });
  
});

//delete categories
router.post("/categories/delete",(req,res) => {
 let id = req.body.id;
 if(id != undefined){
  if (!isNaN(id)) {
      categorieModel.destroy({
        where:{
          id:id
        }
      }).then(() =>{
        res.redirect("/admin/categories");
      })
  }else{
    res.redirect("/admin/categories");
  }
   
 }else{
  res.redirect("/admin/categories");
 }
});

//form update
router.get("/admin/categories/edit/:id",(req,res) =>{
  let id = req.params.id;

  if(isNaN(id)){
    res.redirect("/admin/categories")
  }
  categorieModel.findByPk(id).then(categories => {
    if(categories != undefined){
         res.render("admin/categories/edit",{
          categories:categories
         });
    }else{
      res.redirect("/admin/categories");
    }
  }).catch(erro =>{
    res.redirect("/admin/categories")
  });
});


router.post("/categories/update",(req,res) =>{
  let id =  req.body.id;
  let title = req.body.title;

  categorieModel.update(
    {title:title,slug:slugify(title)},{
    where:{
      id:id
    }}).then(() => {
      res.redirect("/admin/categories");
    })
})



module.exports = router;