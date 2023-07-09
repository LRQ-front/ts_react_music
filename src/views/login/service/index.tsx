import myRequest from '@/service'

export function getCodeKey() {
  return myRequest.get({
    url: '/login/qr/key',
    params: {
      timestamp: Date.now()
    }
  })
}

//必须有cookie
export function getLoginStatus(cookie: string) {
  return myRequest.post({
    url: `/login/status`,
    data: {
      cookie
    }
  })
}

export function getCodeBase64(key: string) {
  return myRequest.get({
    url: '/login/qr/create',
    params: {
      key,
      qrimg: true,
      timestamp: Date.now()
    }
  })
}

export function getCodeState(key: string) {
  return myRequest.get({
    url: '/login/qr/check',
    params: {
      key,
      timestamp: Date.now(),
      noCookie: true
    }
  })
}

export function getVerifyCode(phone: number) {
  return myRequest.get({
    url: '/captcha/sent',
    params: {
      phone
    }
  })
}

export function authenVerifyCode(phone: number, captcha: number) {
  return myRequest.get({
    url: '/captcha/verify',
    params: {
      phone,
      captcha
    }
  })
}

export function checkSignPhone(phone: number) {
  return myRequest.get({
    url: '/cellphone/existence/check',
    params: {
      phone
    }
  })
}

export function checkName(nickname: string) {
  return myRequest.get({
    url: '/nickname/check',
    params: { nickname }
  })
}

export function register(
  phone: number,
  password: string,
  captcha: number,
  nickname: string
) {
  return myRequest.get({
    url: '/register/cellphone',
    params: {
      phone,
      password,
      captcha,
      nickname
    }
  })
}

interface IParams {
  phone: number
  password?: string
  captcha?: number
}
export function loginByPhone(arg: IParams) {
  if (arg.password) {
    return myRequest.get({
      url: '/login/cellphone',
      params: {
        phone: arg.phone,
        password: arg.password
      }
    })
  } else {
    return myRequest.get({
      url: '/login/cellphone',
      params: {
        phone: arg.phone,
        captcha: arg.captcha
      }
    })
  }
}
