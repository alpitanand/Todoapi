const {mongoose} = require('./../server/db/mongoose.js')
const {Todo} = require('./../server/models/todo');
const {ObjectID} = require('mongodb');
const {User} = require('./../server/models/user.js');
//var id = '5a0c3f1f898c4527c0f3e4a611';
//if(!ObjectID.isValid(id)){
//    console.log('Id not valid');
//}



//Todo.find({
//    _id : id
//}).then((todos)=>{
//    console.log(todos);
//})
//
//Todo.findOne({
//    _id:id
//}).then((todo)=>{
//    console.log(todo);
//})

//Todo.findById(id).then((todo)=>{
//    if(!todo){
//        return console.log('id not found');
//    }
//    console.log(todo);
//}).catch((e)=>{
//    console.log(e);
//})
var id= '5a0c7787067d6135888e2e37';

User.findById(id).then((todo)=>{
    if(!todo){
        return console.log('id not found');
    }
    console.log(todo);
    
}).catch((e)=>{
    console.log(e);
})