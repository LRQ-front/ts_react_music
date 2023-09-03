import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  checkSignPhone,
  getCodeBase64,
  getCodeKey,
  getCodeState,
  loginByPhone,
  register
} from '../service'
import { IRootState } from '@/store'
import { message } from 'antd'
import { storeUseInfoAction } from '@/store/modules/user'

export const fetchCodeDataAction = createAsyncThunk(
  'code',
  async (_, { dispatch }) => {
    //1.生成二维码key
    const res = await getCodeKey()

    if (res.code === 200) {
      const unikey = res.data.unikey
      dispatch(changeKeyAction(unikey))
      console.log('key', unikey)

      //2.获取二维码base64
      const imgRes = await getCodeBase64(unikey)

      if (imgRes.code === 200) {
        //base64格式的图片编码
        console.log(imgRes)
        const qrimg = imgRes.data.qrimg
        dispatch(changeQrimgAction(qrimg))
        console.log('qrimg', qrimg)
      } else {
        throw new Error('获取二维码失败', imgRes.code)
      }
    } else {
      throw new Error('获取二维码key值失败', res.code)
    }
  }
)

export const fetchCodeStatusAction = createAsyncThunk<
  void,
  void,
  { state: IRootState }
>('codestatus', async (_, { dispatch, getState }) => {
  console.log(111)

  // const interCheck = setInterval(async () => {
  //   const key = getState().login.key
  //   const res = await getCodeState(key)
  //   console.log('二维码状态', res)

  //   //二维码失效
  //   if (res.code === 800) {
  //     // console.log('过期了')
  //     dispatch(changeShowCodeDisableAction(true))
  //     clearInterval(interCheck)
  //   } else if (res.code === 802) {
  //     //待确认图标展示
  //     dispatch(changeShowCodePendingAction(false))
  //   } else if (res.code === 803) {
  //     //授权登录
  //     dispatch(changeShowPanelAction(false))
  //     clearInterval(interCheck)

  //     //获取cookie
  //     // const cookie = res.cookie
  //     // localStorage.setItem('coolie', cookie)
  //     //根据cookie将用户信息保存起来
  //     dispatch(storeUseInfoAction(res.cookie))

  //     //重置二维码的展示状态，不然一打开就是pending图标的状态
  //     dispatch(changeShowCodePendingAction(true))
  //   }
  // }, 3000)

  // dispatch(changeTimerAction(interCheck))

  // //二维码失效
  // if (res.code === 800) {
  //   dispatch(changeIsDisableAction(true))
  // }
})

export const fetchCheckPhoneAction = createAsyncThunk<
  void,
  number,
  { state: IRootState }
>('checkphone', async (phone: number, { dispatch, getState }) => {
  const res = await checkSignPhone(phone)
  //有名字表示注册过
  if (res.nickname) {
    //手机号已经注册
    console.log('已经注册过')
    const { captcha, phoneNumber } = getState().login
    const params = { phone: Number(phoneNumber), captcha: Number(captcha) }
    const res = await loginByPhone(params)
    console.log('手机登录结果', res)
    if (res.code === 200) {
      dispatch(storeUseInfoAction(res.cookie))
      dispatch(changeShowPanelAction(false))
      dispatch(changeShowCodeMainAction(true))
      message.open({
        content: `登录成功`,
        duration: 2
      })
    } else {
      message.open({
        content: `登录失败，请重新操作`,
        duration: 2
      })
    }
  } else {
    //没有注册过
    dispatch(changeShowSignPanelAction(true))
  }
})

export const registerAction = createAsyncThunk<
  void,
  void,
  { state: IRootState }
>('register', async (_, { dispatch, getState }) => {
  const { phoneNumber, nickname, captcha } = getState().login
  const password = '123456' //注册密码默认123456
  const res = await register(
    Number(phoneNumber),
    password,
    Number(captcha),
    nickname
  )
  console.log(res)
  dispatch(changeShowPanelAction(false))
  message.open({
    content: '注册成功',
    key: 'register',
    duration: 1
  })
})

interface IInitialState {
  key: string
  qrimg: string
  showLoginPanel: boolean
  isDisable: boolean
  showCodeMain: boolean
  showOtherLogin: boolean
  phoneNumber: string
  showSignPanel: boolean
  nickname: string
  captcha: string
  showCodePending: boolean
  showCodeDisable: boolean
}

const initialState: IInitialState = {
  key: '',
  qrimg: '',
  showLoginPanel: false, //登录界面显示
  isDisable: false,
  //展示二维码登录界面或者手机登录界面
  showCodeMain: true,
  showOtherLogin: false,
  phoneNumber: '',
  showSignPanel: false,
  nickname: '',
  captcha: '',
  showCodePending: true, //是否展示二维码界面还是待确认界面
  showCodeDisable: false
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    changeKeyAction(state, { payload }) {
      state.key = payload
    },
    changeQrimgAction(state, { payload }) {
      state.qrimg = payload
    },
    changeShowPanelAction(state, { payload }) {
      state.showLoginPanel = payload
    },
    changeIsDisableAction(state, { payload }) {
      state.isDisable = payload
    },
    changeShowCodeMainAction(state, { payload }) {
      state.showCodeMain = payload
    },
    changeOtherLoginAction(state, { payload }) {
      state.showOtherLogin = payload
    },
    changePhoneNumberAction(state, { payload }) {
      state.phoneNumber = payload
    },
    changeShowSignPanelAction(state, { payload }) {
      state.showSignPanel = payload
    },
    changeNickNameAction(state, { payload }) {
      state.nickname = payload
    },
    changeCaptchaAction(state, { payload }) {
      state.captcha = payload
    },
    changeShowCodePendingAction(state, { payload }) {
      state.showCodePending = payload
    },
    changeShowCodeDisableAction(state, { payload }) {
      state.showCodeDisable = payload
    }
  }
})

export const {
  changeKeyAction,
  changeShowPanelAction,
  changeQrimgAction,
  changeIsDisableAction,
  changeShowCodePendingAction,
  changeNickNameAction,
  changeShowCodeMainAction,
  changeOtherLoginAction,
  changePhoneNumberAction,
  changeShowSignPanelAction,
  changeCaptchaAction,
  changeShowCodeDisableAction
} = loginSlice.actions

export default loginSlice.reducer
