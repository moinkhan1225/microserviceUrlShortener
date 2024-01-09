require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const mongoose = require('mongoose');

//connecting mongoDB

mongoose.connect(process.env.MONGO_URI)
.then(console.log("Mongo is Connected"))
.catch((e)=>{
  console.error(e)
})

//creating schema

const urlShrinker = mongoose.Schema({
  originalUrl:{
    type:String,
    required:true
  },
  shortUrl:{
    type:String,
    required:true
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



//for Post
app.post('/api/a',(req,res)=>{
  const data = new data({
    originalUrl    :   "asdasdas",
    shortUrl       :   "asdasd"
    })
})
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
