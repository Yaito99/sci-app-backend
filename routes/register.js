var express = require('express');
var app = express();
var database = require('../config/database');



app.post('/sciapi/register',(req ,res)=>{
  let check = `SELECT id FROM _users WHERE username = '${req.body.username}'`
  database.query(check , (err , result)=>{
    if(result.length > 0){
      res.status(400).json({
        message:err
      });
    }else {
      let sql = `INSERT INTO _users (username , password , name , email , phone , address , type , registerDate , profile_img)
      VALUES ('${req.body.username}' , '${req.body.password}' , '${req.body.name}' , '${req.body.email}' , '${req.body.phone}' , '${req.body.address}' , '1' , NOW() , 'default_profile.png') `;
      database.query(sql,(err , result)=>{
        if(err){
          res.status(400).json({
            message:err
          });      
          return    
        }
        res.status(200).json({
          message:"DONE"
        });        
      })
    }
})

})


module.exports=app 