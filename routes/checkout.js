var express = require('express');
var app = express();
var database = require('../config/database');


app.post('/sciapi/checkout/productorder',(req ,res)=>{
  let sql = `SELECT id FROM _users WHERE username='${req.body.shopname}'`   
  database.query(sql , (err , result ) =>{
    let shopid = result[0].id
    let sql_ = `INSERT INTO _orders (userid , name , number , province , area , location , itemId , shopId , quantity , price , regtime)
    VALUES ('${req.body.userid}' , '${req.body.name}','${req.body.phone}','${req.body.province}','${req.body.area}','${req.body.cords.latitude}|${req.body.cords.latitudeDelta}|${req.body.cords.longitude}|${req.body.cords.longitudeDelta}|', '${req.body.itemId}' , '${shopid}' , '${req.body.quantity}' , '${req.body.price}' , NOW())`
    database.query(sql_ , (err , result) =>{
    if(err){
      res.status(400).json({
        message:err
      });
      return;
    }
    res.status(200).json({
      status:200,
      success:true
    }); 
    let sql_2 = `UPDATE _products SET quantity = quantity - '${req.body.quantity}' WHERE id = '${req.body.itemId}' `
    database.query(sql_2) 
    let sql_3 = `UPDATE _users SET products = products + 1 WHERE id = '${req.body.userid}'`
    database.query(sql_3)      
    } )    
  }) 
})

app.post('/sciapi/checkout/shoporder',(req ,res)=>{
  let sql = `SELECT id FROM _users WHERE username='${req.body.shopname}'`   
  database.query(sql , (err , result ) =>{
    let shopid = result[0].id
    let sql_2 = `UPDATE _partners SET orders = orders + 1 WHERE userid = '${shopid}'`
    database.query(sql_2)  
    let sql_3 = `UPDATE _users SET orders = orders + 1 WHERE id = '${req.body.userid}'`
    database.query(sql_3)  
    if(err){
      res.status(400).json({
        message:err
      });
      return;
    }
    res.status(200).json({
      status:200,
      success:true
    }); 
  }) 
})


app.post('/sciapi/checkout/deliveryorder',(req ,res)=>{ 
  let sql_ = `INSERT INTO _deliveryorders (userid , name , number , partnerid ,pickup , target , regtime)
  VALUES ('${req.body.userid}' , '${req.body.name}','${req.body.phone}','${req.body.partnerid}','${req.body.pickup.latitude}|${req.body.pickup.latitudeDelta}|${req.body.pickup.longitude}|${req.body.pickup.longitudeDelta}|','${req.body.target.latitude}|${req.body.target.latitudeDelta}|${req.body.target.longitude}|${req.body.target.longitudeDelta}|' , NOW())`
  database.query(sql_ , (err , result) =>{
  if(err){
    res.status(400).json({
      message:err
    });
    return;
  }
  res.status(200).json({
    status:200,
    success:true
  }); 
  let sql_2 = `UPDATE _products SET quantity = quantity - '${req.body.quantity}' WHERE id = '${req.body.itemId}' `
  database.query(sql_2) 
  let sql_3 = `UPDATE _users SET products = products + 1 WHERE id = '${req.body.userid}'`
  database.query(sql_3)      
  } )    
})


module.exports=app 