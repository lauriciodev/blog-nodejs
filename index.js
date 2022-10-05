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
  res.render("index");
});

app.listen(4000,() =>{
  console.log("servidor ok!")
})