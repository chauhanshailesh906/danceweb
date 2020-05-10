const express = require("express");
const app = express();
const path = require("path"); 
const port = 80;
var mongoose = require('mongoose');
const bodyparser=require("body-parser");
mongoose.connect('mongodb://localhost/ab', { useNewUrlParser: true ,useUnifiedTopology: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var contactSchema = new mongoose.Schema({
  name: String,
  age:String,
});

var Contact = mongoose.model('de',contactSchema);

app.use(express.static('public'));
app.use(express.urlencoded())

app.get('/', (req, res)=>{ 
    res.sendfile(__dirname+'/views/index.html');
})
app.get('/contact', (req, res)=>{ 
    res.sendfile(__dirname+'/views/contact.html');
})

app.post('/contact', (req, res)=>{ 
    var myData= new Contact(req.body);
       myData.save().then(()=>{
        res.send("we are connected")
    }).catch((err)=>{
        res.status(200).send("item not seved",err)
    });
  
});

app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});