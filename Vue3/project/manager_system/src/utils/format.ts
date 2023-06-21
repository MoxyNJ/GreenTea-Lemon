import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

/**
 * 将 utc 格式可视化为普通文本
 * @param utcString 需要调整的时间 utc 格式
 * @param format 文本格式
 * @returns 调整后的文本时间
 */
export function formatUTC(utcString: string, format: string = 'YYYY/MM/DD HH:mm:ss') {
  // utcOffset(8) 调整为东八区、format 调整文本格式
  const resultTime = dayjs.utc(utcString).utcOffset(8).format(format)
  return resultTime
}
