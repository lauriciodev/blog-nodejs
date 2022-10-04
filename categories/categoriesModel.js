const Sequelize = require("sequelize");
const connection = require("../database/database");

const categorieModel = connection.define("categories",{
  title:{
  type:Sequelize.STRING,
  allowNull:false
},slug:{
  type: Sequelize.STRING,
  allowNull:false
}
});


module.exports = categorieModel;