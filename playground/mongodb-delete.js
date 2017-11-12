var {MongoClient} = require('mongodb');
MongoClient.connect("mongodb://localhost:27017/TodoApp",(err, db)=>{
    if(err){
        return console.log("Error occoured");
    }
    console.log("Database connected");
    
    //deleteMany
//    db.collection('Todos').deleteMany({text:'Eat lunch'}).then((result)=>{
//        console.log(result);
//    })
    
    //deleteOne
    
//    db.collection('Todos').deleteOne({text:'Eat lunch'}).then((result)=>{
//        console.log(result);
//    })
    
    // findOneandDelete
    
    db.collection('Todos').findOneAndDelete({completed:false}).then((result)=>{
        console.log(result);
    })
    
    db.close();
})