function delayResolve(str){
    return new Promise((resolve, reject) => {
        console.log(str);
        setTimeout(resolve, 1000);
    });
}

let x = delayResolve('P1')
    .then(() => delayResolve('P2'))
    .then(() => delayResolve('P3'))
    .then(() => delayResolve('P4'))

console.log(x);
console.log('list 1');
setTimeout(console.log, 1000, 'list 2');

setTimeout(() => {
console.log('list 3');
}, 2000);
setTimeout(console.log, 5000, x)
// P1
// list 1
// P2
// list 2
// list 3
// P3
