export function parseResToSuggestString(result: any) {
  const keys = Array.from(result.order) //['songs', 'artists', 'albums', 'playlists']

  const SuggestStringArr = []
  let suggestString = ''

  for (const key of keys) {
    const singleTypeSuggest = []
    const keyArr = result[key as string]
    //拼接四个类型的关键词
    for (const item of keyArr) {
      suggestString += item.name
      if (item.artists) {
        suggestString += '-'
        for (const artist of item.artists) {
          suggestString += artist.name + ' '
        }
      }
      singleTypeSuggest.push(suggestString)
      suggestString = ''
    }
    SuggestStringArr.push(singleTypeSuggest)
  }

  return SuggestStringArr
}
