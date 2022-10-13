const Sequelize = require("sequelize");
const connection = require("../database/database");

const userModel = connection.define("users",{
  email:{
  type:Sequelize.STRING,
  allowNull:false
},password:{
  type: Sequelize.STRING,
  allowNull:false
}
});

userModel.sync({force:false});
module.exports = userModel;