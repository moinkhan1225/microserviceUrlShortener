require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const bodyParser = require("body-parser")
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({extended:true}))
//connecting mongoDB

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
  console.log("Mongo is Connected");
  })
.catch((e)=>{
  console.error(e)
})



//creating schema

const urlShrinker = mongoose.Schema({
  originalUrl:{
    type:Array
  },
  shortUrl:{
    type:Array
  }
})

//creating model
const urlShrinkModel=mongoose.model('urlShrinkModel',urlShrinker)

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const prop={
  originalUrl:[],
  shortUrl:[]
}

//for Post
app.post('/api/shorturl',(req,res)=>{
  //prop.originalUrl.push(req.body.url)
  //prop.shortUrl.push(prop.originalUrl.length)
  //urlShrinkModel.originalUrl.push(req.body.url)
  //urlShrinkModel.shortUrl.push(req.originalUrl.length)
  console.log(urlShrinkModel)
  res.json({
    original_url:req.body.url,
    short_url:prop.shortUrl.length
    
  })
  console.log(prop)
})
app.get('/api/shorturl/:url',(req,res)=>{
  let url = Number(req.params.url);
  prop.shortUrl.filter((item,index)=>{
    if(item === url){
      res.redirect(prop.originalUrl[index])
    }else{
      res.send("Fuck off")
    }
  }) 

  // if (prop.shortUrl){
  //   redirect(prop.originalUrl[url]);
  // }else{
  //   res.send("Short Url Doejsnt Exist")
  // }
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
