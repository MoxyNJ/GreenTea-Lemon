export function handleSongsCategory(data) {
  // 1.获取所有的类别
  const category = data.categories;
  // category： {0: '语种', 1: '风格', 2: '场景', 3: '情感', 4: '主题'}

  // 2.创建类别数据结构
  //   2.1 entries 把category 对象转换为了可迭代的数组，成员是对象的 key / value 对
  //     (5) [Array(2), Array(2), Array(2), Array(2), Array(2)]
  //       0: (2) ['0', '语种']
  //       1: (2) ['1', '风格']
  //       2: (2) ['2', '场景']
  //       3: (2) ['3', '情感']
  //       4: (2) ['4', '主题']
  //   2.2 利用 map 对数组进行改造，参数利用了解构赋值，提取出 key 和 value
  const categoryData = Object.entries(category).map(([key, value]) => {
    return {
      name: value,
      subs: [],
    };
  });
  // categoryData
  // (5) [{…}, {…}, {…}, {…}, {…}]
  //   0: {name: '语种', subs: Array(5)}
  //   1: {name: '风格', subs: Array(21)}
  //   2: {name: '场景', subs: Array(12)}
  //   3: {name: '情感', subs: Array(12)}
  //   4: {name: '主题', subs: Array(18)}
  //   length: 5

  // 3.将subs添加到对应的类别中
  for (let item of data.sub) {
    categoryData[item.category].subs.push(item);
  }

  return categoryData;
}

// 获取歌手字母类别
// return:  28) ['-1', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0']
// 开头的 -1 代表全部，结尾的 0 代表其他。
export function generateSingerAlpha() {
  var alphabets = ["-1"];
  var start = "A".charCodeAt(0);
  var last = "Z".charCodeAt(0);
  for (var i = start; i <= last; ++i) {
    alphabets.push(String.fromCharCode(i));
  }

  alphabets.push("0");
  return alphabets;
}

export const singerAlphas = generateSingerAlpha();
