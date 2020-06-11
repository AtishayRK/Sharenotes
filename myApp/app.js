const express= require('express');
const mongoose= require('mongoose');
const bodyparser= require('body-parser');
const cors= require('cors');
const path = require('path');
 const app=express();
const routes= require('./routes/routes');


 app.use(bodyparser.json());
 app.use(cors());
 app.use(express.static(path.join(__dirname,'public')));
 app.get('/',(req,res)=>{
     console.log("hello");
 });
 app.use('/apis',routes);
 
 app.listen(4000,(err)=>{
     if(err)
     {
         console.log("error at port 3000");
     }
     else{
         console.log("listening at 3000");
     }
 })
 app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });