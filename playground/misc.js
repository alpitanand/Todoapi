//var newTodo = new Todo({
//    
//})
//
//var newTodo2 = new Todo({
//    text: '     Edit this video        '
//})
//newTodo2.save().then((doc)=>{
//    console.log('Saved todo',doc)
//},(e)=>{
//    console.log("Unable to save",e);
//});

var user = new User({
    email:"alpitanand20@gmail.com"
})

user.save().then((doc)=>{
    console.log(doc);
},(e)=>{
    console.log('Unable to save');
})