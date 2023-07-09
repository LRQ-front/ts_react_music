import React, { memo } from 'react'
import type { ReactNode } from 'react'
import { Suspense } from 'react'
import { Link, Outlet } from 'react-router-dom'
import NavBar from './c-cpns/nav-bar'
interface IProps {
  //最新版本中，如果有传递children，需要在这里声明children，之前的版本会自己声明好的
  children?: ReactNode
}

const Discover: React.FC<IProps> = (props) => {
  return (
    <div>
      <NavBar></NavBar>
      {/* 防止二次路由切换时，一级路由的内容跳闪,因为使用了路由懒加载，点到相应的路由才进行下载分包 */}
      <Suspense fallback="">
        <Outlet />
      </Suspense>
    </div>
  )
}

export default memo(Discover)
