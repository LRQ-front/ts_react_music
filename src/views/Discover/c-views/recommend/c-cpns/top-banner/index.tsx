import React, { memo, useRef, useState } from 'react'
import type { ReactNode, ElementRef } from 'react'
import { BannerControl, BannerLeft, BannerRight, BannerWrapper } from './style'
import { useAppSelector } from '@/store'
import { shallowEqual } from 'react-redux'
import { Carousel } from 'antd'
import classNames from 'classnames'

interface IProps {
  children?: ReactNode
}

const TopBanner: React.FC<IProps> = () => {
  //这里需要手动指明current绑定的元素的类型，默认是undefined，并且这里后面还必须初始化为null
  const bannerRef = useRef<ElementRef<typeof Carousel>>(null)

  //背景轮播图的下标
  const [currentIndex, setCurrentIndex] = useState(0)

  const { banners } = useAppSelector(
    (state) => ({
      banners: state.recommend.banners
    }),
    shallowEqual
  )

  //背景图片
  let bgImgUrl = banners?.[currentIndex]?.imageUrl
  if (bgImgUrl) {
    bgImgUrl = bgImgUrl + '?imageView&blur=40x20'
  }

  function handlePre() {
    bannerRef.current?.prev()
  }
  function handleNext() {
    bannerRef.current?.next()
  }

  function handleAfterChange(index: number) {
    // setCurrentIndex(index)
  }
  function handleBeforChange(current: number, next: number) {
    // if (next === 0) {
    //   setCurrentIndex(0)
    //   return
    // }
    setCurrentIndex(next)
  }

  return (
    <BannerWrapper
      style={{ background: `url('${bgImgUrl}') center center / 6000px` }}
    >
      <div className="banner wrap-v2">
        <BannerLeft>
          <Carousel
            dots={false}
            autoplay
            ref={bannerRef}
            afterChange={handleAfterChange}
            beforeChange={handleBeforChange}
            effect="fade"
          >
            {banners?.map((item) => {
              return (
                <div className="item" key={item.imageUrl}>
                  <img
                    className="image"
                    src={item.imageUrl}
                    alt={item.typeTitle}
                  />
                </div>
              )
            })}
          </Carousel>
          <ul className="dots">
            {banners?.map((item, index) => {
              return (
                <li key={item.imageUrl}>
                  <span
                    className={classNames('item', {
                      active: index === currentIndex
                    })}
                  ></span>
                </li>
              )
            })}
          </ul>
        </BannerLeft>
        <BannerRight></BannerRight>
        <BannerControl>
          <button className="btn left" onClick={handlePre}></button>
          <button className="btn right" onClick={handleNext}></button>
        </BannerControl>
      </div>
    </BannerWrapper>
  )
}

export default memo(TopBanner)
