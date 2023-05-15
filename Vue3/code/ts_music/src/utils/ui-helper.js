export function scrollTo(element, to, duration) {
  if (duration <= 0) return;
  // to 元素已经滚动的长度
  // scrollTop 元素目前滚动的长度
  // difference 元素此轮要滚动的长度
  var difference = to - element.scrollTop;
  // 设置一个缓动值
  var perTick = (difference / duration) * 10;

  setTimeout(function () {
    element.scrollTop = element.scrollTop + perTick;
    if (element.scrollTop === to) return;
    scrollTo(element, to, duration - 10);
  }, 10);
}
