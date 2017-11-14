//cd  D:\web-development\Node.js\node-todo-api

var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');

var app = express();
app.use(bodyParser.json());

app.get('/todos',(req,res)=>{
    res.status(200).send("<h1>Alpit</h1>")
})

app.post('/todos',(req,res)=>{
    var todo = new Todo({
        text: req.body.text
    })
    todo.save().then((doc)=>{
        res.send(doc);
    },(e)=>{
       res.status(400).send(e);
    })
})

app.listen(3000, ()=>{
    console.log("Server is up");
});

module.exports = {app:app};