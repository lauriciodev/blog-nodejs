const express = require("express");
const router = express.Router();
const categorieModel = require("./categoriesModel");
const slugify = require("slugify");

router.get("/admin/categories/new",(req,res) =>{
  res.render("admin/categories/new");
});

router.post("/categories/save",(req,res) =>{
  let title = req.body.title;
  if(title != undefined){
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

module.exports = router;