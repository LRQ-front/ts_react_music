export function formatCount(num: number) {
  if (num > 100000) {
    return Math.floor(num / 10000) + '万'
  } else {
    return num
  }
}

export function getImageSize(
  img: string,
  width: number,
  height: number = width
) {
  return img + `?param=${width}x${height}`
}

//获取播放音乐地址
export function getPlayUrl(id: number) {
  return ` https://music.163.com/song/media/outer/url?id=${id}.mp3 `
}

//格式化时间
export function formatTime(time: number) {
  //转成秒单位
  const secondTime = time / 1000

  //获得分钟
  const minute = Math.floor(secondTime / 60)
  //获得秒数
  const seconds = Math.floor(secondTime) % 60

  const formatMinute = String(minute).padStart(2, '0')
  const formatSeconds = String(seconds).padStart(2, '0')
  return `${formatMinute}:${formatSeconds}`
}

type Io = 'M+' | 'd+' | 'h+' | 'm+' | 's+'

export function formatDate(time: number, fmt: string) {
  const date = new Date(time)

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k as Io] + ''
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      )
    }
  }
  return fmt
}

function padLeftZero(str: any) {
  return ('00' + str).substr(str.length)
}

export function formatMonthDay(time: number) {
  return formatDate(time, 'MM月dd日')
}

export function formatMinuteSecond(time: number) {
  return formatDate(time, 'mm:ss')
}
