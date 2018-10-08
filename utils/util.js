const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('') + [hour, minute, second].map(formatNumber).join('')
}

const getTime = date => {
  const hour = date.getHours()
  if ((hour >= 6) && (hour < 12)) {
    return "早上"
  } else if ((hour >=12) && (hour < 18)) {
    return "下午"
  } else {
    return "晚上"
  }
}

const getDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  getTime: getTime,
  getDate: getDate
}
