const express= require('express');
const jwt= require("jsonwebtoken");
const router=express.Router();
const multer= require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid=require('gridfs-stream');
const  user= require('../model/user');
const file= require('../model/file');
const mongoose=require('mongoose');
mongoose.connect("mongodb://atishay:passwordatishay@cluster0-shard-00-00-8i13z.mongodb.net:27017,cluster0-shard-00-01-8i13z.mongodb.net:27017,cluster0-shard-00-02-8i13z.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority",{useUnifiedTopology : true,useNewUrlParser : true});

    mongoose.connection.on('error',(err)=>{
        console.log("error in coonection");
    });
    let gfs;
    mongoose.connection.on('connected',()=>{
        console.log("connected to mongo");
gfs= Grid(mongoose.connection.db,mongoose.mongo);  
gfs.collection('fs');   

});
//const 
function verifyToken(req,res,next)
{
    if(!req.headers.authorization)
    {
        return res.status(401).send('unauthorized');
    }
  let token = req.headers.authorization.split(' ')[1];
  if(token===null)
  {
  return res.status(401).send('unauthorized');
  }
  else{
       let verify = jwt.verify(token,'secretkey');
       if(!verify)
       return res.status(401).send('unauthorized');
      
           req.userid=verify.subject;
           next()
       
        }
}
router.post('/register',(req,res,next)=>{
let newUser= new user(
{
name : req.body.name,
password: req.body.password,
role : req.body.role
}
);
newUser.save((err,User)=>{
    if(err)
    {
        res.json({msg :err});
    }
    else
    {
        let payload ={subject : User._id};
            let token = jwt.sign(payload,'secretKey');
            res.status(200).send({token});
    }
})
});
router.post('/login',(req,res)=>{
    user.find({$and : [{name: req.body.name},{password:req.body.password},{role:req.body.role}]},(err,result)=>{
        if(err)
        {
            res.status(401).send("invalid login");
            res.json({msg: "invalid"});
        }
        else{
            let payload ={subject : result._id};
            let token = jwt.sign(payload,'secretKey');
            res.status(200).send({token});
        }
    });
});
let storage = GridFsStorage({
    gfs : gfs,
     url : "mongodb://atishay:passwordatishay@cluster0-shard-00-00-8i13z.mongodb.net:27017,cluster0-shard-00-01-8i13z.mongodb.net:27017,cluster0-shard-00-02-8i13z.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority",
     file: (req, file) => {
        return new Promise((resolve, reject) => {
            const filename = file.originalname;
            const fileInfo = {
              filename: filename,
              bucketName: 'fs'
            };
            resolve(fileInfo);
        });
      }
});
let upload = multer({
    storage: storage
}).single('file');

router.post('/upload', (req, res) => {
    upload(req,res, (err) => {
        if(err){
             res.json({error_code:1,err_desc:err});
             return;
        }
     let obj=[];
       obj[0] ={
           originalname: req.file.originalname,
           contentType : req.file.contentType
       }
      
        res.status(200).json(obj);
    });
}); 
router.get('/file/:filename', (req, res) => {
   //set collection name to lookup into
gfs.collection('fs');
    /** First check if file exists */
    gfs.files.find({filename: req.params.filename}).toArray(function(err, files){
        if(!files || files.length === 0){
            return res.status(404).json({
                responseCode: 1,
                responseMessage: "error"
            });
        }
        
        var readstream = gfs.createReadStream({
            filename: files[0].filename,
            root: "fs"
        });
       
        console.log(files);
        res.set('Content-Type', files[0].contentType)
       
        return readstream.pipe(res);
    });
});


router.get('/files', (req, res) => {
    let filesData = [];
    let count = 0;
gfs.collection('fs'); 

    gfs.files.find().toArray((err, files) => {
       
        if(!files || files.length === 0){
            
            return res.status(404).json({
                responseCode: 1,
                responseMessage: "error"
            });
        }
      
        files.forEach((file) => {
            filesData[count++] = {
                filename: file.filename,
                contentType: file.contentType
            }
        });
        res.json(filesData);
    });
});
router.post('/Names',(req,res)=>{

   file.find({name: req.body.name},(err,result)=>{
       if(err)
       {
           res.json({"err" : err})
       }
       else{
          if(result.length===0)
          {
            let newFile=new file({
                name:req.body.name,
                fileName: [req.body.fileName],
                content : [req.body.content]
            })
            newFile.save((err,result)=>{
                if(err)
                res.json({'errr' : err});
                else
                res.json({"msg":"sucess new save"})
            })
          }
          else{
             
        file.updateOne(
            {name : req.body.name},
            { $addToSet : {fileName : req.body.fileName}},(err,result)=>{
             if(err)
             console.log("error "+err);
             else
             console.log("ok name");
            }
        )
        file.updateOne(
            {name : req.body.name},
            { $addToSet : {content : req.body.content}},(err,result)=>{
             if(err)
             console.log("error "+err);
             else
             console.log("ok content");
            }
        )
        res.json({"msg":"updated"});
       }}
   })
 
})
router.get('/getnames',(req,res)=>{

    let filedata=[{
        name : String,
        fileName :[String],
        content : [String]
    }];
    let count=0;
    file.find((err,result)=>{
        if(err)
        res.json({"err" :"cannot get data"});

        else
        {
            
            result.forEach((files)=>{
                filedata[count++]={
                    name  : files.name,
                    fileName : files.fileName ,
                    content : files.content
                }
              
            })
            res.json(filedata);
        }
    })
})
module.exports=router;

