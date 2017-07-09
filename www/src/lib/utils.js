export const leftPad = (str, len, pChar) => {
  let strLen = `${str}`.length
  if (len <= strLen) return `${str}`
  let res = ''
  for (let i = strLen; i < len; i++) {
    res += pChar
  }
  res += str
  return res
}

export const dateFormatter = (timestamp, formatter = 'YYYY-MM-DD hh:mm:ss') => {
  let date = new Date(timestamp)
  const regMap = {
    'Y+': `${date.getFullYear()}`,
    'M+': leftPad(date.getMonth() + 1, 2, '0'),
    'D+': leftPad(date.getDate(), 2, '0'),
    'h+': leftPad(date.getHours(), 2, '0'),
    'm+': leftPad(date.getMinutes(), 2, '0'),
    's+': leftPad(date.getSeconds(), 2, '0'),
    'S+': leftPad(date.getMilliseconds(), 3, '0')
  }
  for (let key in regMap) {
    if (new RegExp(`(${key})`).test(formatter)) {
      let replaceStr = regMap[key].substr(regMap[key].length - RegExp.$1.length)
      formatter = formatter.replace(RegExp.$1, replaceStr)
    }
  }
  let datetime = new Date(timestamp)
  datetime.toLocaleDateString()
  return formatter
}

export const scrollTop = (dom, top, time = 200) => {
  let originTop = dom.scrollTop
  let speed = (top - originTop) / time
  let compareTop = originTop
  let alarmId = setInterval(() => {
    let targetTop = dom.scrollTop + speed * 10
    if (targetTop === compareTop) {
      clearInterval(alarmId)
      return
    }
    if ((top - dom.scrollTop) * (top - targetTop) <= 0) {
      dom.scrollTop = top
      clearInterval(alarmId)
    } else {
      dom.scrollTop = targetTop
      compareTop = targetTop
    }
    console.log(dom.scrollTop, targetTop, top)
  }, 10)
}
