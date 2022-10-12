const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");

//extern routes
const routesCategories = require("./categories/contegoriesControler");
const routesArticles = require("./articles/articlesControles");

//databases models 
const articlesModel = require("./articles/articlesModel");
const categoriesModel = require("./categories/categoriesModel");
const { Sequelize } = require('sequelize');

//set view engine
app.set("view engine","ejs");

//static
app.use(express.static("public"));

//set body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//database connection
connection.authenticate()
.then(() =>{
  console.log("database success connection ");
})
.catch((erro) =>{
console.log(erro);
});


//setup routers
app.use("/",routesCategories);
app.use("/",routesArticles);



app.get("/",(req,res) =>{
 articlesModel.findAll(
 {
  order:[
    ["id","DESC"]
  ],
  limit:6
 }
 ).then(articles =>{
  categoriesModel.findAll().then(categories =>{
   res.render("index",{
    articles:articles,
    categories:categories
  })
  });
 });
});





app.get("/:slug", (req,res) =>{
  let slug = req.params.slug;
  articlesModel.findOne({
    where:{
      slug:slug
    }
  }).then( articles =>{
    if(articles != undefined){
      categoriesModel.findAll().then(categories =>{
        res.render("articles",{
         articles:articles,
         categories:categories
       })
       });
    }else{
      res.redirect("/");
    }
  }).catch(erro => {
    res.redirect("/");
  });
});

app.get("/categories/:slug", (req,res) =>{
  let slug = req.params.slug
  
  categoriesModel.findOne({
    where:{
      slug:slug
    },include: [{model:articlesModel}]
  }).then( categorie =>{
    if(categorie != undefined){
      categoriesModel.findAll().then(categories =>{
        res.render("index",{articles:categorie.articles,
        categories:categories});
      });
    }else{
      res.redirect("/");
    }
  }).catch(erro =>{
    res.redirect("/");
  })
});

app.post("/search",(req,res) =>{
  let Op = Sequelize.Op;
  let search = `%${req.body.search}`;
  articlesModel.findOne({
    where:{
      title:{ [Op.like]: search }
    }
  }).then(results =>{
    if(results != undefined){
      res.render("results",{
        articles:results
       })
    }else{
      res.send("nada encontrado");
    }
     
  })
   
  

 })


app.listen(3000,() =>{
  console.log("servidor ok!")
});
