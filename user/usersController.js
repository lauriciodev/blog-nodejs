const express= require("express");
const router = express.Router();
const userModel = require("./user");
const  bcrypt = require("bcryptjs");

router.get("/admin/users",(req,res) =>{
  userModel.findAll().then(users =>{
    res.render("admin/users/userslist",{
      users:users
    })
  })
})


router.get("/admin/users/create",(req,res) =>{
  res.render("admin/users/create")
})

router.post("/users/create", (req,res) =>{
  let email = req.body.email;
  let password = req.body.password;
   
  userModel.findOne({
    where:{email:email}
  }).then(user =>{
    if(user == undefined){
      let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password,salt);
 
  
 
  userModel.create({
    email:email,
    password:hash
  }).then(() =>{
    res.redirect("/");
  }).catch((erro) =>{
    res.redirect("/")
  })

    }else{
        res.send("email  já em uso")
    }
  })
})


module.exports = router;
