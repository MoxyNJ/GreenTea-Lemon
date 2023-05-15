export function getRandomNumber(num) {
  const max = num
  const min = 0
  return Math.floor((Math.random() * (max - min)) + min)
}
