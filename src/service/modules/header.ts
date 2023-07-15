import myRequest from '..'

export function logout(cookie: string) {
  return myRequest.get({
    url: '/logout',
    data: {
      cookie
    }
  })
}
