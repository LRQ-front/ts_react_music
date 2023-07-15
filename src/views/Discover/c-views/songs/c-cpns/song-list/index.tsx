import React, { memo } from 'react'
import type { ReactNode } from 'react'
import { SonglistWrapper } from './style'
interface IProps {
  children?: ReactNode
}

const Songlist: React.FC<IProps> = () => {
  return <SonglistWrapper>Songlist</SonglistWrapper>
}

export default memo(Songlist)
