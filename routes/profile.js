var express = require('express');
var app = express();
var database = require('../config/database');
var multer = require('multer')

var storage  = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, 'uploads/')
},
  filename: function (req, file, cb) {
    cb(null, 'profile' + Date.now() + '.' +file.originalname.split(".")[1] )
  }
  })

  var storagetwo  = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
    filename: function (req, file, cb) {
      cb(null, 'category' + Date.now() + '.' +file.originalname.split(".")[1] )
    }
    })
  

var upload = multer({ storage: storage }).single('photo')

var uploadtwo = multer({ storage: storagetwo }).single('photo')


app.post('/sciapi/profile/update',(req ,res)=>{
  upload(req, res, function (err) {    
    if (err instanceof multer.MulterError) {
        return res.status(500).json(err)
    } else if (err) {
        return res.status(500).json(err)
    }
    let sql = `UPDATE _users SET name='${req.body.name}' , phone='${req.body.phone}' , address='${req.body.address}' , profile_img='${req.file.filename}' WHERE id='${req.body.userid}' `;
    database.query(sql,(err , result)=>{
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
})


app.post('/sciapi/profile/updatee',(req ,res)=>{
  let sql = `UPDATE _users SET name='${req.body.name}' , phone='${req.body.phone}' , address='${req.body.address}' WHERE id='${req.body.userid}' `;
  database.query(sql,(err , result)=>{
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

app.post('/sciapi/profile/partner',(req ,res)=>{
  let sql = `INSERT INTO _requests (userid , request_type , message , regtime) 
  VALUES ('${req.body.userid}' , '${req.body.request_type}' , '${req.body.message}' , '${new Date().toISOString().slice(0, 19).replace('T', ' ')}');`;
  database.query(sql,(err , result)=>{
    if(err){
      res.status(400).json({
        message:err
      });
      return;
    }
    let sql =`UPDATE _users SET type='2' WHERE id ='${req.body.userid}'`
    database.query(sql , (err , result)=>{
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
})



app.get('/sciapi/profile/admin/requests',(req , res) => {
  let sql = 'SELECT _requests.id , userid , request_type , message , regtime , _users.name , _users.phone , _users.email , _users.profile_img FROM _requests JOIN _users ON _requests.userid = _users.id'
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


app.post('/sciapi/profile/admin/partner/accept' , (req , res) =>{
  let sql = `UPDATE _users SET type='${req.body.value}' WHERE id ='${req.body.userid}'`
  database.query(sql , (err , result) =>{
    if(err){
      res.status(400).json({
        message:err
      });
      return
    }
    let sql = `INSERT INTO _partners (userid,description,rates,raters,orders,products)
    VALUES ('${req.body.userid}' , 'Write a description about your service here' , '0' , '0', '0', '0' )`
    database.query(sql , (err , result) =>{
      if(err){
        res.status(400).json({
          message:err
        });
        return
      }
      sql = `DELETE FROM _requests WHERE id ='${req.body.reqid}'`
      database.query(sql,(err , result) =>{
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
    })    
  })
})

app.post('/sciapi/profile/admin/partner/decline', (req , res) =>{
  sql = `DELETE FROM _requests WHERE id ='${req.body.reqid}'`
  database.query(sql,(err , result) =>{
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
})


app.post('/sciapi/profile/admin/category/add',(req ,res)=>{
  uploadtwo(req, res, function (err) {    
    if (err instanceof multer.MulterError) {
        return res.status(500).json(err)
    } else if (err) {
        return res.status(500).json(err)
    }
    let sql = `INSERT INTO _categories (name , img) VALUES ('${req.body.name}' , '${req.file.filename}' )`;
    database.query(sql,(err , result)=>{
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
})


app.get('/sciapi/profile/partner/:userid',(req , res) => {
  let sql = `SELECT * FROM _users JOIN _partners ON _users.id = _partners.userid  WHERE _users.id = '${req.params.userid}'`
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



app.post('/sciapi/profile/partner/shop/additem',(req ,res)=>{
  upload(req, res, function (err) {    
    if (err instanceof multer.MulterError) {
        return res.status(500).json(err)
    } else if (err) {
        return res.status(500).json(err)
    }
    let sql = `INSERT INTO _products (name , price , description , quantity , rating , registerTime , bought , shopid , img , categoryid)
    VALUES ('${req.body.name}' , '${req.body.price}' , '${req.body.desc}' , '${req.body.quantity}' , '0' , NOW() , '0' ,'${req.body.shopid}' , '${req.file.filename}' , '${req.body.category}' )`;
    database.query(sql,(err , result)=>{
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
      let sql_3 = `UPDATE _partners SET products = products + 1 WHERE userid = '${req.body.shopid}'`
      database.query(sql_3)        
    })     
  })
})


app.get('/sciapi/profile/shop/orders/:shopid',(req , res) => {
  let sql = `SELECT * FROM _orders WHERE shopid = '${req.params.shopid}'`
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

app.get('/sciapi/profile/user/orders/:id',(req , res) => {
  let sql = `SELECT * FROM _orders WHERE userid = '${req.params.id}'`
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


app.post('/sciapi/profile/user/favourite/add' , (req , res) =>{
  let sql = `INSERT INTO _favorites(partnerid , userid) VALUES('${req.body.partner}','${req.body.user}')`
  database.query(sql , (err , result) =>{
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
    })    

app.post('/sciapi/profile/user/favourite/delete' , (req , res) =>{
let sql = `DELETE FROM _favorites WHERE partnerid='${req.body.partner}' AND userid = '${req.body.user}'`
database.query(sql , (err , result) =>{
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
})    


app.get('/sciapi/profile/user/favourite/:shopid/:userid',(req , res) => {
  let sql = `SELECT * FROM _favorites WHERE partnerid='${req.params.shopid}' AND userid = '${req.params.userid}'`
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
app.get('/sciapi/profile/user/getfavourite/:userid',(req , res) => {
  let sql = `SELECT * FROM _favorites WHERE userid = '${req.params.userid}'`
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

app.get('/sciapi/profile/user/getfavourite/items/:users',(req , res) => {
  let sql = `SELECT * FROM _products WHERE shopid IN (${req.params.users})`
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

app.post('/sciapi/profile/partner/setdesc' , (req , res) =>{
  let sql = `UPDATE _partners SET description= '${req.body.desc}' WHERE id = '${req.body.partnerid}'`
  database.query(sql , (err , result) =>{
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
    })    


module.exports=app 