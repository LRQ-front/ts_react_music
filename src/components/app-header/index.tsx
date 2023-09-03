import React, { memo, useState } from 'react'
import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { HeaderWrapper, LeftWrapper, RightWrapper } from './style'
import HeadTitles from '@/assets/data/header_titles.json'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '@/store'
import { fetchSearchSuggestAction } from '@/store/modules/search'
import debounce from 'lodash/debounce'
import { shallowEqual } from 'react-redux'
import classNames from 'classnames'
import {
  changeShowPanelAction,
  fetchCodeDataAction,
  fetchCodeStatusAction
} from '@/views/login/store'
import TopList from '../top-list'
import { getAccount } from '@/service/modules/search'
interface IProps {
  children?: ReactNode
}

const AppHeader: React.FC<IProps> = () => {
  const [inputValue, setValue] = useState('')
  const [showSuggest, setShowSuggest] = useState(false)
  const [isHover, setIsHover] = useState(false)

  const dispatch = useAppDispatch()
  const { suggestList, suggestStringList, avatarUrl } = useAppSelector(
    (state) => ({
      suggestList: state.search.searchSuggest,
      suggestStringList: state.search.suggestStringList,
      avatarUrl: state.user.avatarUrl
    }),
    shallowEqual
  )

  function showItem(item: any) {
    if (item.type === 'path') {
      return (
        <NavLink to={item.link}>
          {item.title}
          <i className="icon sprite_01"></i>
        </NavLink>
      )
    } else if (item.type === 'link') {
      return (
        <a href={item.link} rel="noreferrer" target="_blank">
          {item.title}
        </a>
      )
    }
  }

  function handleValueChange(e: any) {
    const value = e.target.value
    // console.log(value)
    if (value) {
      setShowSuggest(true)
    } else {
      setShowSuggest(false)
    }
    setValue(value)

    dispatch(fetchSearchSuggestAction(value))

    // const suggestStringArr = parseResToSuggestString(suggestList)
    // console.log(suggestStringArr)
    // console.log(suggestList)
  }

  //输入框防抖
  const debounceValueChange = debounce(handleValueChange, 500)

  function handleFocus() {
    if (!inputValue) return
    setShowSuggest(true)
  }

  //点击登录按钮发送获取二维码
  function handleLogin() {
    //获取二维码
    dispatch(fetchCodeDataAction())
    //显示登录框
    dispatch(changeShowPanelAction(true))
    // //获取登录状态
    // dispatch(fetchCodeStatusAction())
  }

  return (
    <HeaderWrapper>
      <div className="content wrap-v1" onMouseLeave={(e) => setIsHover(false)}>
        <LeftWrapper>
          <a className="logo sprite_01">网易云音乐</a>
          <div className="select-list">
            {HeadTitles.map((item) => {
              return (
                <div className="select-item" key={item.title}>
                  {showItem(item)}
                </div>
              )
            })}
          </div>
        </LeftWrapper>
        <RightWrapper showsuggest={showSuggest ? 1 : 0}>
          <Input
            className="search"
            placeholder="音乐/视频/电台/用户"
            onChange={(e) => debounceValueChange(e)}
            onBlur={(e) => setShowSuggest(false)}
            onFocus={handleFocus}
            prefix={<SearchOutlined />}
          />
          <div className="center">创作者中心</div>
          <div className="login" onMouseEnter={(e) => setIsHover(true)}>
            {avatarUrl !== '' ? (
              <img src={avatarUrl} className="img" alt=""></img>
            ) : (
              <div onClick={handleLogin}>登录</div>
            )}
            {avatarUrl && (
              <div
                className="top-list"
                style={{ display: isHover ? 'block' : 'none' }}
                onMouseLeave={(e) => setIsHover(false)}
              >
                <TopList></TopList>
              </div>
            )}
          </div>
          <div className="search-suggest">
            <div className="top">搜&quot;{inputValue}&quot;相关用户 &gt;</div>
            <div className="bottom">
              {suggestStringList?.map((item, index: number) => {
                return (
                  <div className="item" key={item.classname}>
                    <div className="title">
                      <i className={`icon sprite_icon2 ${item.classname}`}></i>
                      <span>{item.type}</span>
                    </div>
                    <ul
                      className={classNames('ctn', { shadow: index % 2 === 1 })}
                    >
                      {item.keywords.map((item: any, index: number) => {
                        return (
                          <li key={index} className="keyword">
                            <div
                              dangerouslySetInnerHTML={{ __html: item }}
                            ></div>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )
              })}
            </div>
          </div>
        </RightWrapper>
      </div>
      <div className="divider"></div>
    </HeaderWrapper>
  )
}

export default memo(AppHeader)
