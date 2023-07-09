export interface ILyric {
  text: string
  time: number
}

const timeRegExp = /\[(\d{2}):(\d{2}).(\d{2,3})\]/
export function parseLyricToArr(lyricString: string) {
  const lines = lyricString.split('\n')

  const lyric: ILyric[] = []

  for (const line of lines) {
    const res = timeRegExp.exec(line)
    if (!res) continue
    const time1 = Number(res[1])
    const time2 = Number(res[2])
    const time3 = res[3].length === 3 ? Number(res[3]) : Number('0' + res[3])

    const time = time1 * 60 * 1000 + time2 * 1000 + time3

    const text = line.replace(timeRegExp, '')
    lyric.push({ text, time })
  }

  return lyric
}
