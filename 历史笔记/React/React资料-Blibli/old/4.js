var obj = {a: {b: 1}};

function f(key, value) {
    console.log(`key: ${key}, value: ${value}`);    
    return value;

}

JSON.stringify(obj, f)