import { type RouteObject } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
//由于下面element使用jsx语法，在ts的检测下必须导入React
import React, { lazy } from 'react'

import Discover from '@/views/Discover'
import Recommend from '@/views/Discover/c-views/recommend'
// import Focus from '@/views/focus'
// import Mine from '@/views/mine'
// import Download from '@/views/download'

//使用路由懒加载,会进行分包处理
// const Discover = lazy(() => import('@/views/Discover'))
// const Recommend = lazy(() => import('@/views/Discover/c-views/recommend'))
//prefetch预提取
const Ranking = lazy(
  () => import(/* webpackPrefetch:true */ '@/views/Discover/c-views/ranking')
)
const Songs = lazy(
  () => import(/* webpackPrefetch:true */ '@/views/Discover/c-views/songs')
)
const Djradio = lazy(
  () => import(/* webpackPrefetch:true */ '@/views/Discover/c-views/djradio')
)
const Artist = lazy(
  () => import(/* webpackPrefetch:true */ '@/views/Discover/c-views/artist')
)
const Album = lazy(
  () => import(/* webpackPrefetch:true */ '@/views/Discover/c-views/album')
)

const Focus = lazy(() => import(/* webpackPrefetch:true */ '@/views/focus'))
const Mine = lazy(() => import(/* webpackPrefetch:true */ '@/views/mine'))
const Download = lazy(
  () => import(/* webpackPrefetch:true */ '@/views/download')
)

const Playlist = lazy(
  () => import(/* webpackPrefetch:true */ '@/views/Discover/c-views/playlist')
)

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/discover/recommend" />
  },
  {
    path: '/discover',
    element: <Discover></Discover>,
    children: [
      {
        path: '/discover',
        element: <Navigate to="/discover/recommend" />
      },
      {
        path: '/discover/recommend',
        element: <Recommend />
      },
      {
        path: '/discover/ranking',
        element: <Ranking />
      },
      {
        path: '/discover/songs',
        element: <Songs />
      },
      {
        path: '/discover/djradio',
        element: <Djradio />
      },
      {
        path: '/discover/artist',
        element: <Artist />
      },
      {
        path: '/discover/album',
        element: <Album />
      },
      {
        path: '/discover/playlist',
        element: <Playlist></Playlist>
      }
    ]
  },
  {
    path: '/focus',
    element: <Focus></Focus>
  },
  {
    path: '/mine',
    element: <Mine />
  },
  {
    path: '/download',
    element: <Download></Download>
  }
]

export default routes
