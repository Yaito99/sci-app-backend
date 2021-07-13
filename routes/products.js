var express = require('express');
var app = express();
var database = require('../config/database');

app.get('/sciapi/products/get/:id',(req , res) => {
  let sql = `SELECT * FROM _products WHERE id = '${req.params.id}' `
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


app.get('/sciapi/products/all',(req , res) => {
  let sql = `SELECT * FROM _products `
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


app.get('/sciapi/products/hot',(req , res) => {
  let sql = `SELECT * FROM _products ORDER BY bought DESC LIMIT 20`
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

app.get('/sciapi/products/1001',(req , res) => {
  let sql = `SELECT * FROM _products ORDER BY bought DESC`
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



app.get('/sciapi/products/new',(req , res) => {
  let sql = `SELECT * FROM _products ORDER BY registerTime DESC LIMIT 20 `
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

app.get('/sciapi/products/1002',(req , res) => {
  let sql = `SELECT * FROM _products ORDER BY registerTime DESC `
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


app.get('/sciapi/products/top',(req , res) => {
  let sql = `SELECT * FROM _products ORDER BY rating DESC LIMIT 20`
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



app.get('/sciapi/products/1003',(req , res) => {
  let sql = `SELECT * FROM _products ORDER BY rating DESC`
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


app.get('/sciapi/products/category/:id',(req , res) => {
  let sql = `SELECT * FROM _products WHERE categoryid = '${req.params.id}' `
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


app.get('/sciapi/products/shopinfo/:id',(req , res) => {
  let sql = `SELECT _users.id , description , rates , raters , username , name , profile_img , _partners.orders , _partners.products  FROM _users JOIN _partners ON _users.id = _partners.userid WHERE _users.id = '${req.params.id}' `
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


app.get('/sciapi/products/shopname/:id',(req , res) => {
  let sql = `SELECT (name , username) FROM _users WHERE id = '${req.params.id}' `
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


app.post('/sciapi/products/delete',(req , res) => {
  let sql = `DELETE FROM _products WHERE id = '${req.body.itemId}' `
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

app.post('/sciapi/products/edititem',(req , res) => {
  let sql = `UPDATE _products SET name = '${req.body.name}' , description = '${req.body.desc}' , quantity = '${req.body.quantity}' , price = '${req.body.price}' WHERE id = '${req.body.id}'`
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

app.get('/sciapi/products/shop/:shopid',(req , res) => {
  let sql = `SELECT * FROM _products WHERE shopid = '${req.params.shopid}' `
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