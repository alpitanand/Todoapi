//cd  D:\Projects\web-development\Node.js\Todoapi\server

var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');
var {
    mongoose
} = require('./db/mongoose.js');
var {
    Todo
} = require('./models/todo.js');
var {
    User
} = require('./models/user.js');
var {
    ObjectID
} = require('mongodb');
var app = express();
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    })
    todo.save().then((doc) => {
        res.status(200).send(doc);
    }, (e) => {
        res.status(400).send(e);
    })
})

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.status(200).send({
            todos
        })
    }, (e) => {
        res.status(400).send(e);
    })
})

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    var val = ObjectID.isValid(id);
    if (val) {
        Todo.findById(id).then((doc) => {
            res.send({
                todo: doc
            })
        }).catch((e) => {
            console.log(e);
        })
    } else {
        res.status(404).send({
            text: 'not found'
        })
    }
    //Validate id using mongoose id
    //404 - send back empty id
})

//Added deletion
app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(404).send(todo);
        } else {
            res.status(200).send({
                todo
            });
        }
    }).catch((e) => {
        res.status(404).send();
    })
})

app.patch('/todos/:id',(req,res)=>{
    var id = req.params.id;
    var body = _.pick(req.body,['text','completed']);
   console.log(body);
     if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
        console.log(body);
    }else{
        body.completed = false;
        body.completedAt = null;
    }
    Todo.findByIdAndUpdate(id,{$set : body},{new:true}).then((todo)=>{
        if(!todo){
            return res.status(400).send();
        }
        res.status(200).send(todo);
    }).catch((e)=>{
        res.status(400).send();
    })
})

app.listen(port, () => {
    console.log("Server is up " + port);
});

module.exports = {
    app: app
};
