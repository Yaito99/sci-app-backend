const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user:"root",
  password:"Zoxacole",
  database:"sci"
});


module.exports=con;