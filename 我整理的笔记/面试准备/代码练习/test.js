let a1 = {
  b: {
    c: {},
  },
};

let b1 = {};
let b2 = {
  a: b1,
};
b1.a = b2;

let a2 = JSON.parse(JSON.stringify(a1));

// 解决循环引用
const toJSON = (obj) => {
  let cache = [];

  const res = JSON.parse(
    JSON.stringify(obj, (index, item) => {
      if (typeof item === "object" && item !== null) {
        if (cache.indexOf(item) !== -1) {
          // 出现了循环引用
          return undefined;
        }
        cache.push(item);
      }
      return item;
    })
  );
  cache = null;
  return res;
};

let newObj = toJSON(b2);
console.log("@");
