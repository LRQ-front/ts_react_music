import { BASE_URL, TIME_OUT } from './config'
import httpRequest from './request'

const myRequest = new httpRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})

let ck: any
if (localStorage.getItem('cookie')) {
  ck = localStorage.getItem('cookie')
}

export const requestWithCK = new httpRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  withCredentials: true, //关键,
  params: {
    cookie: ck && JSON.parse(ck)
  }
  // headers: {
  //   'X-Custom-Cookie': `${JSON.parse(localStorage.getItem('cookie') as string)}`
  // }
})

export default myRequest
