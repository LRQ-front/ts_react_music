import { useAppDispatch } from '@/store'
import {
  changeShowPanelAction,
  fetchCodeDataAction,
  fetchCodeStatusAction
} from '../views/login/store'

export default function useVerifyLogin() {
  const dispatch = useAppDispatch()

  const verify = () => {
    console.log(localStorage.getItem('cookie'))

    if (
      !localStorage.getItem('cookie') ||
      localStorage.getItem('cookie') === ''
    ) {
      dispatch(fetchCodeDataAction())
      dispatch(changeShowPanelAction(true))
      console.log('打印了')

      return false
    } else {
      return true
    }
  }
  return { verify }
}
