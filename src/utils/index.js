export function addZero(num) {
  return num < 10 ? '0' + num : num
}
export function formatDateTime(date, format) {
  const time = new Date(Date.parse(date))
  const Y = time.getFullYear() + '-'
  const M = addZero(time.getMonth() + 1) + '-'
  const D = addZero(time.getDate())
  const h = addZero(time.getHours()) + ':'
  const m = addZero(time.getMinutes()) + ':'
  const s = addZero(time.getSeconds())
  if (format === 'YYYY-MM-DD') {
    return Y + M + D
  } else {
    return Y + M + D + ' ' + h + m + s
  }
}