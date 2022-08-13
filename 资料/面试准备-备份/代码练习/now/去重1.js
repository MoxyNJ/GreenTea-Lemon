function repeat(s, n) {
    let res = "";
    for (let i = 0; i < n; i++) {
        res += s;
    }
    return res;
}

repeat("abc", 2); // abcabc
console.log(repeat("abc", 4));
