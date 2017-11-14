var asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            if(typeof a === 'number' && typeof b === 'number')
                {
                    resolve(a+b);
                }else{
                    reject('Arguments must be a number');
                }
        }, 1500);
    })
};

asyncAdd(5,'c').then((c)=>{
    console.log(c);
}).catch((e)=>{
    console.log(e);
})