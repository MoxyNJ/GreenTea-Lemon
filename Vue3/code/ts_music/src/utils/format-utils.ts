/**
 * 获取小尺寸的专辑封面
 * 图片地址+?param=200x200，获取200x200尺寸的图片
 *  */
export function getSizeImage(imgUrl: string, size: number) {
  return `${imgUrl}?param=${size}x${size}`;
}

/**
 * 音乐的播放量：12亿，35万，1413
 */
export function getCount(count: number) {
  if (count < 0) return;
  // 小于2万
  if (count < 100000) {
    return count;
    // 小于2亿
  } else if (Math.floor(count / 20000) < 10000) {
    return Math.floor(count / 10000) + '万';
    // return Math.floor(count / 1000) / 10 + "万";
  } else {
    return Math.floor(count / 100000000) + '亿';
    // return Math.floor(count / 10000000) / 10 + "亿";
  }
}

// 即将播放的音乐，拼接一下
export function getPlayUrl(id: number) {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
}

// 格式化：时间
export function formatDate(time: any, fmt: any) {
  const date = new Date(time);

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  const o: any = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
    }
  }
  return fmt;
}

function padLeftZero(str: string) {
  return ('00' + str).substr(str.length);
}

// 调用上面的时间格式化函数，
export function formatMonthDay(time: any) {
  return formatDate(time, 'MM月dd日');
}

// 调用上面的时间格式化函数，
export function formatMinuteSecond(time: any) {
  return formatDate(time, 'mm:ss');
}

//** 新的格式化音乐时间函数 */
export function formatTime(time: number) {
  // 毫秒 => 秒
  const timeSeconds = time / 1000;
  // 获取分钟 + 秒钟
  const min = Math.floor(timeSeconds / 60);
  const sed = Math.floor(timeSeconds) % 60;
  // 格式化，添加两位数的0补位，如：”3:21“ 调整为：”03:31“
  const formatMin = String(min).padStart(2, '0');
  const formatDed = String(sed).padStart(2, '0');
  return `${formatMin}:${formatDed}`;
}
