var express = require('express');
var app = express();
var database = require('../config/database');

app.get('/sciapi/delivery/all',(req , res) => {
  let sql = `SELECT * FROM _partners JOIN _users ON _partners.userid = _users.id WHERE _users.type='30'`
  database.query(sql , (err , result) => {
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

app.get('/sciapi/delivery/orders/:partnerid',(req , res) => {
  let sql = `SELECT * FROM _deliveryorders WHERE partnerid='${req.params.partnerid}'`
  database.query(sql , (err , result) => {
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