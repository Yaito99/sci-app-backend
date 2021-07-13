var express = require('express')
var app = express();
var cors = require('cors');
var database = require('./config/database');
var port = process.env.PORT || 3005;


database.connect((err)=>{
  if(err) throw err;
})

app.use('/sciapi/uploads',express.static('uploads'));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({
  extended:true
}))

app.use('/',[
  require('./routes/register'),  
  require('./routes/login'),
  require('./routes/user'),
  require('./routes/profile'),
  require('./routes/categories'),  
  require('./routes/products'),
  require('./routes/checkout'),  
  require('./routes/delivery'),    
]);



app.listen(port, ()=>{
  console.log(`Listening at http://localhost:${port}`)
});