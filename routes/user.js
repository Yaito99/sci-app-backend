var express = require('express');
var app = express();
var database = require('../config/database');


app.get('/sciapi/user/:id',(req,res) =>{
  let sql = `SELECT * FROM _users where id =${req.params.id}`;
  database.query(sql,(err , result)=>{
    if(err){
      res.status(400).json({
        message:err
      });
      return
    }
    if (result.length) res.json(result);
    else {
      res.status(200).json({
        status:200,
        success:true        
      });
    }
  })  
})


module.exports=app 