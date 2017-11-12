// cd  D:\web-development\Node.js\node-todo-api\playground

//var MongoClient = require("mongodb").MongoClient;
var {MongoClient, ObjectID} = require("mongodb");
var user = {
    name: "Alpit",
    age : 24
}
var objectID =  new ObjectID();
console.log(objectID);
var {name} = user;
console.log(name);
MongoClient.connect("mongodb://localhost:27017/TodoApp",(err, db)=>{
    if(err){
      return console.log("Unable to connect");
    }
   console.log("Connected to mongoDb server");

//        db.collection('Alupapita').insertOne({
//        name: "Alpit anand",
//        surname : "papita"
//    },(err, result)=>{
//        if(err){
//            return console.log("Unable to insert todo");
//        }
//        console.log(JSON.stringify(result.ops[0]._id.toHexString(),undefined,4));
//    })
    db.listCollections().toArray(function(err, items){
        console.log(items);
    });
    
    db.close();
})