import myRequest, { requestWithCK } from '..'

export function getSearchSuggest(keywords: string) {
  return myRequest.get({
    url: '/search/suggest',
    params: {
      keywords
    }
  })
}

//获取用户详情
export function getAccount() {
  return requestWithCK.get({
    url: '/user/account',
    params: {
      cookie: JSON.parse(localStorage.getItem('cookie') as string)
    }
  })
}
