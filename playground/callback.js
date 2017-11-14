var b = (a,b,callback)=>{
    callback(a+b,"alpit");
}

b(3,4 ,(sum,y)=>{
    console.log(sum);
    console.log(y);
})