const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const session = require("express-session");

//extern routes
const routesCategories = require("./categories/contegoriesControler");
const routesArticles = require("./articles/articlesControles");
const routesUser = require("./user/usersController");

//databases models 
const articlesModel = require("./articles/articlesModel");
const categoriesModel = require("./categories/categoriesModel");
const userModel = require("./user/user")
const { Sequelize } = require('sequelize');

//set view engine
app.set("view engine","ejs");

//redis


//configurando express-session
//sessions
app.use(session({
  secret:"senhafacil",
  cookie:{maxAge:30000}
}));

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



//passando dados para a session
//setup routers
app.use("/",routesCategories);
app.use("/",routesArticles);
app.use("/", routesUser);


app.get("/session", (req,res) =>{
req.session.treinamento = "formação node";
req.session.nome = "lauricio";
req.session.user = {
  email:"lauricio@gmail.com",
  pass:"233444221"
};


res.send("sessão gerada!")
});


//pegando dados da session
app.get("/reading",(req,res) =>{
  res.json({
    treinamento:req.session.treinamento,
    nome:req.session.nome,
    user:req.session.user
  })

})

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
