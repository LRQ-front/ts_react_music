/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { Suspense, useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from './router'
import AppHeader from './components/app-header'
import AppFooter from './components/app-footer'
import AppPlayerBar from './views/player/app-player-bar'
import { useAppDispatch, useAppSelector } from './store'
import { fetchSongDetailAction } from './views/player/store'
import Login from './views/login'
import {
  changeAvataUrlAction,
  changeUidoAction,
  storeUseInfoAction
} from '@/store/modules/user'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    //加载用户信息
    let ck = localStorage.getItem('cookie')
    // console.log('ck', ck)

    if (ck) {
      //有cookie
      ck = JSON.parse(ck!)
      dispatch(storeUseInfoAction(ck!))
    } else {
      // 没有cookie，需要重新登录
      dispatch(changeAvataUrlAction(''))
      dispatch(changeUidoAction(-1))
    }

    dispatch(fetchSongDetailAction(1968781675))
  }, [])

  const { showLoginPanel } = useAppSelector((state) => ({
    showLoginPanel: state.login.showLoginPanel
  }))
  return (
    <div className="app">
      <AppHeader></AppHeader>
      {/* 异步加载组件需要使用suspense */}
      <Suspense fallback="">
        <div className="main">{useRoutes(routes)}</div>
      </Suspense>
      <AppFooter />
      <AppPlayerBar></AppPlayerBar>
      {showLoginPanel && <Login></Login>}
    </div>
  )
}

export default App
