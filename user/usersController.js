const express= require("express");
const router = express.Router();
const userModel = require("./user");

router.get("/admin/users",(req,res) =>{
  res.send("listagemde usuarios");
})


router.get("/admin/users/create",(req,res) =>{
  res.render("admin/users/create")
})

router.post("/users/create", (req,res) =>{
  let email = req.body.email;
  let password = req.body.password;


  res.json({
    email,
    password
  })

 /*  userModel.create({
    email:email,
    password:password
  })
 */
})


module.exports = router;
