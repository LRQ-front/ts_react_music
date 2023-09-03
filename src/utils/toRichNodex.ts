export default function stringToNodes(keyword: string, value: string) {
  //value是关键字，keyword是整个搜索建议
  if (keyword.toUpperCase().includes(value.toUpperCase())) {
    const keyStartIndex = keyword.toUpperCase().indexOf(value.toUpperCase())

    const preText = keyword.slice(0, keyStartIndex)
    const key = keyword.slice(keyStartIndex, keyStartIndex + value.length)
    const keyText = `<span class="highlight">${key}</span>`
    const nextText = keyword.slice(keyStartIndex + value.length, keyword.length)
    // const keywordArr = keyword.split('')
    // const keyIndex = keywordArr.indexOf(value)

    // keywordArr.splice(keyIndex, 1, `<span class="highlight">${value}</span>`)

    return preText + keyText + nextText
  } else {
    return keyword
  }
}
