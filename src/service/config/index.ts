//1.手动声明，开发和生产环境
// export const BASE_URL = 'http://codercba.com:9002'

export const BASE_URL = '/api' //项目部署地址

// export const BASE_URL = 'http://localhost:3000/'
export const TIME_OUT = 10000

//2.通过webpack提供的变量设置环境
// let BASE_URL = ''

// if (process.env.NODE_ENV === 'development') {
//   BASE_URL = 'http://codercba.dev/'
// } else {
//   BASE_URL = 'http://codercba.pro/'
// }

// export { BASE_URL }

// console.log(process.env)
