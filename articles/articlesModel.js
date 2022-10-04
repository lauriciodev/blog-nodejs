const Sequelize = require("sequelize");
const connection = require("../database/database");
const categoriaModel = require("../categories/categoriesModel");
const categorieModel = require('../categories/categoriesModel');


const articleModel = connection.define("articles",{
  title:{
  type:Sequelize.STRING,
  allowNull:false
},slug:{
  type: Sequelize.STRING,
  allowNull:false
},body:{
  type:Sequelize.TEXT,
  allowNull:false
}
});

categorieModel.hasMany(articleModel); //uma categoria tem muitos artigos
articleModel.belongsTo(categorieModel); //um artigo pertence a uma categoria

articleModel.sync({force:true})

module.exports = articleModel;