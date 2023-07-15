import { useAppDispatch } from '@/store'
import {
  changeShowPanelAction,
  fetchCodeDataAction,
  fetchCodeStatusAction
} from '../views/login/store'

export default function useVerifyLogin() {
  const dispatch = useAppDispatch()

  const verify = () => {
    if (localStorage.getItem('cookie') === '') {
      dispatch(fetchCodeDataAction())
      dispatch(changeShowPanelAction(true))
      return false
    } else {
      return true
    }
  }
  return { verify }
}
