import React, { memo } from 'react'
import type { ReactNode } from 'react'
import { AlbumItemWrapper } from './style'
interface IProps {
  children?: ReactNode
  itemData: any
}

const AlbumItem: React.FC<IProps> = (props) => {
  const { itemData } = props
  return (
    <AlbumItemWrapper>
      <div className="top">
        <img src={itemData.picUrl} alt="" />
        <a href="" className="cover sprite_covor"></a>
      </div>
      <div className="bottom">
        <div className="name">{itemData.name}</div>
        <div className="artist">{itemData.artist.name}</div>
      </div>
    </AlbumItemWrapper>
  )
}

export default memo(AlbumItem)
