import React, { memo } from 'react'
import type { ReactNode } from 'react'
import { MenuItemWrapper } from './style'
import { formatCount, getImageSize } from '@/utils/format'
interface IProps {
  children?: ReactNode
  itemData: any
}

const SongMenuItem: React.FC<IProps> = (props) => {
  const { itemData } = props
  return (
    <MenuItemWrapper>
      <div className="top">
        <img src={getImageSize(itemData?.picUrl, 140)} alt="" />
        <div className="sprite_covor cover ">
          <div className="info sprite_covor">
            <span>
              <i className="sprite_icon headset"></i>
              <span className="count">{formatCount(itemData?.playCount)}</span>
            </span>
            <i className="sprite_icon play"></i>
          </div>
        </div>
      </div>
      <div className="bottom">{itemData?.name}</div>
    </MenuItemWrapper>
  )
}

export default memo(SongMenuItem)
