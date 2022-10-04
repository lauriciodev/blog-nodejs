const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");

//extern routes
const routes = require("./categories/contegoriesControler");

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

app.use("/",routes);



app.get("/",(req,res) =>{
  res.render("index");
});

app.listen(8080, () =>{
  console.log("servidor ok!")
})