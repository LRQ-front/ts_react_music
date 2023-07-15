import React, { memo, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { Suspense } from 'react'
import { Link, Outlet } from 'react-router-dom'
import NavBar from './c-cpns/nav-bar'
import { DiscoverWrapper } from './style'
import eventBus from '@/utils/eventBus'
interface IProps {
  //最新版本中，如果有传递children，需要在这里声明children，之前的版本会自己声明好的
  children?: ReactNode
}

const Discover: React.FC<IProps> = (props) => {
  const [showCover, setShowCover] = useState(false)

  useEffect(() => {
    eventBus.on('isCover', handleCover)
  })

  function handleCover(flag: boolean) {
    setShowCover(flag)
  }

  return (
    <DiscoverWrapper>
      {/* {showCover && <div className="white-cover"></div>} */}
      <NavBar></NavBar>
      {/* 防止二次路由切换时，一级路由的内容跳闪,因为使用了路由懒加载，点到相应的路由才进行下载分包 */}
      <Suspense fallback="">
        <Outlet />
      </Suspense>
    </DiscoverWrapper>
  )
}

export default memo(Discover)
