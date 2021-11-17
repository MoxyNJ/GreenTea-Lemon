// let obj = { a: 1, b: { b: 3, c: 5} };
let obj = { b: { b: 3, c: 5}, a: 1};

function f(key, value) {
    // if (typeof value === "number") {
        console.log(`key: ${key}, value: ${value}`);    
        // value = 2 * value + 1;
    // }
    return value;
}

let x = JSON.stringify(obj, f)
console.log(x);
// '{"a": 2,"b": 4}'