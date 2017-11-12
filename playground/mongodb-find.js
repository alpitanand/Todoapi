// cd  D:\web-development\Node.js\node-todo-api\playground

const {MongoClient, ObjectID}  = require('mongodb');
MongoClient.connect("mongodb://localhost:27017/TodoApp",(err, db)=>{
    if(err){
        return console.log("cant able to  connect");
    }
    console.log("Connected to databases");
    db.collection('Todos').find({completed : true}).toArray().then((docs)=>{
        console.log(JSON.stringify(docs,undefined,4));
    }, (err)=>{
        console.log("Unable to resolve");
    })
    db.close();
})
