const Sequelize = require("sequelize");

const connection = new Sequelize("blog-project","root","berlim2062",{
  host:"localhost",
  dialect:"mysql",
  timezone:"-03:00"
});

module.exports = connection;