import React, { ElementRef, memo, useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { AlbumWrapper } from './style'
import { Carousel, message } from 'antd'
import AreaHeaderV1 from '@/components/area-header-v1'
import { useAppSelector } from '@/store'
import { shallowEqual } from 'react-redux'
import NewAlbumItem from '@/components/new-album-item'
interface IProps {
  children?: ReactNode
}

const NewAlbum: React.FC<IProps> = () => {
  const bannerRef = useRef<ElementRef<typeof Carousel>>(null)

  const { newAlbum } = useAppSelector(
    (state) => ({
      newAlbum: state.recommend.newAlbum
    }),
    shallowEqual
  )

  function handlePre() {
    bannerRef.current?.prev()
  }
  function handleNext() {
    bannerRef.current?.next()
  }
  function handleClick() {
    message.open({
      content: `功能未开发`,
      duration: 1,
      key: 'func'
    })
  }
  return (
    <AlbumWrapper>
      <AreaHeaderV1 title="新碟上架" moreLink="/discover/album"></AreaHeaderV1>
      <div className="content">
        <button
          className="sprite_02 arrow arrow-left"
          onClick={handlePre}
        ></button>
        <div className="banner">
          <Carousel ref={bannerRef} dots={false} speed={1500}>
            {[0, 1].map((item) => {
              return (
                <div key={item}>
                  <div className="item-list">
                    {newAlbum?.slice(item * 5, (item + 1) * 5)?.map((item) => {
                      return (
                        <div
                          className="album"
                          key={item.name}
                          onClick={handleClick}
                        >
                          <NewAlbumItem itemData={item}></NewAlbumItem>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </Carousel>
        </div>
        <button
          className="sprite_02 arrow arrow-right"
          onClick={handleNext}
        ></button>
      </div>
    </AlbumWrapper>
  )
}

export default memo(NewAlbum)
