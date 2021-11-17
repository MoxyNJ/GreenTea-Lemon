let p1 = new Promise((resolve, reject) => {
    reject(Promise.reject("Oops"))
})

p1.then((x)=>{
    console.log(x);
    console.log("yes!");
}, (x) => {
    console.log(x);
    console.log("Oh no");
});
