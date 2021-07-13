var express = require('express');
var app = express();
var database = require('../config/database');



app.post('/sciapi/login',(req ,res)=>{
  let sql = `SELECT * FROM _users WHERE username = '${req.body.username}' AND password= '${req.body.password}'`;
  database.query(sql,(err , result)=>{
    if(err){
      res.status(400).json({
        message:err
      });      
      return    
    }
    if(result.length > 0 ){
    res.status(200).json({
      status:200,
      success:true,
      user: result[0] 
    });        
    }
    else{
      res.status(400).json({
        message:'Wrong Password or email'
      });       
    }
  })
    


})


module.exports=app 