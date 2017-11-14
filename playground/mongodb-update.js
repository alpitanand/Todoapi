//cd  D:\web-development\Node.js\node-todo-api\playground

var {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db)=>{
    if(err){
        return console.log(err);
    }
console.log("connected to db");
    db.collection('Alupapita').findOneAndUpdate({name: "Alpit anand"},{
        $set :{
            name:"Prachee chandrakar"
        }},{
        returnOrignal :false
    }
    ).then((result)=>{
        console.log(result);
    })
    db.close();
})