// [00:00.77]Once upon a younger year
// [00:04.47]When all our shadows disappeared
// [00:06.44]The animals inside came out to play
// [00:10.15]Went face to face with all our fears
//

// [00:10.15]Went face to face with all our fears
// 切割的正则表达式
const parseExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/;

// 歌词切换
export function parseLyric(lyricString) {
  // 用于保存得到的每一个歌词对象
  const lyrics = [];

  // 获得一个数组，把一长串的歌词切割为一句一句的。
  const lineStrings = lyricString.split("\n");
  for (let line of lineStrings) {
    // 判断是否有值，有可能切割后有空元素
    if (line) {
      const result = parseExp.exec(line);
      if (result === null) continue;
      // 拿到时间后，转换为毫秒
      const time1 = result[1] * 60 * 1000;
      const time2 = result[2] * 1000;
      // 根据单词列表，最后一组数字有可能是3位，有可能是2位
      const time3 = result[3].length === 3 ? result[3] * 1 : result[3] * 10;
      const time = time1 + time2 + time3;
      // 对字符串进行删减，只保留歌词
      const content = line.replace(parseExp, "").trim();
      // 得到这个对象，然后添加到lyrics数组中
      lyrics.push({ time, content });
    }
  }
  return lyrics;
}
