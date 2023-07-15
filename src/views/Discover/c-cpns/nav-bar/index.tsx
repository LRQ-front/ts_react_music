import React, { memo } from 'react'
import type { ReactNode } from 'react'
import { discoverMenu } from '@/assets/data/local-data'
import { NavWrapper } from './style'
import { NavLink } from 'react-router-dom'
interface IProps {
  children?: ReactNode
}

const NavBar: React.FC<IProps> = () => {
  return (
    <NavWrapper>
      <div className="nav wrap-v1">
        {discoverMenu.map((item) => {
          return (
            <div className="item" key={item.title}>
              <NavLink to={item.link}>{item.title}</NavLink>
            </div>
          )
        })}
      </div>
    </NavWrapper>
  )
}

export default memo(NavBar)
