const express = require("express");
const router = express.Router();
const categorieModel = require("./categoriesModel");
const slugify = require("slugify");

router.get("/admin/categories/new",(req,res) =>{
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
      res.redirect("/");
    })
    
  }else{
    res.redirect("/admin/categories/new");
  }
})

//list categories
router.get("/admin/categories", (req,res) =>{
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



module.exports = router;