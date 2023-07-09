import { BASE_URL, TIME_OUT } from './config'
import httpRequest from './request'

const myRequest = new httpRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})

export const requestWithCK = new httpRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  withCredentials: true, //关键,
  params: {
    cookie: JSON.parse(localStorage.getItem('cookie') as string)
  }
  // headers: {
  //   'X-Custom-Cookie': `${JSON.parse(localStorage.getItem('cookie') as string)}`
  // }
})

export default myRequest
