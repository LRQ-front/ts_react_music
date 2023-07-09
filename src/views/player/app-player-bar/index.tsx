import React, { memo, useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { BarControl, BarOperator, BarPlayInfo, PlayBarWrapper } from './style'
import { Slider, message } from 'antd'
import { useAppDispatch, useAppSelector } from '@/store'
import { getImageSize, getPlayUrl, formatTime } from '@/utils/format'
import {
  changeLyricIndexAction,
  changePlayModeAction,
  preOrNextSong
} from '../store'
import AppPlayerPanel from '../app-player-panel'
import { shallowEqual } from 'react-redux'
interface IProps {
  children?: ReactNode
}

const PlayerBar: React.FC<IProps> = () => {
  const [isPlaying, setPlayState] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isSlider, setSlider] = useState(false)
  const [showPannel, setShow] = useState(false)

  const audioRef = useRef<HTMLAudioElement>(null)

  const dispatch = useAppDispatch()

  const { currentSong, lyric, lyricIndex, playMode, playSongList } =
    useAppSelector(
      (state) => ({
        currentSong: state.player.currentSong,
        lyric: state.player.lyric,
        lyricIndex: state.player.lyricIndex,
        playMode: state.player.playMode,
        playSongList: state.player.playSongList
      }),
      shallowEqual
    )

  function handlePlayClick() {
    //设置播放或暂停
    isPlaying
      ? audioRef.current?.pause()
      : audioRef.current?.play().catch(() => setPlayState(false))

    setPlayState(!isPlaying)
  }

  useEffect(() => {
    //播放音乐
    audioRef.current!.src = getPlayUrl(currentSong.id)

    // audioRef.current
    //   ?.play()
    //   .then(() => {
    //     setPlayState(true)
    //     console.log('播放成功')
    //   })
    //   .catch((err) => {
    //     setPlayState(false)
    //     console.log('播放失败', err)
    //   })
  }, [currentSong])

  //音乐进度函数
  function handleTimeUpdate() {
    // if (showPannel) message.destroy()
    const currentTime = audioRef.current!.currentTime * 1000

    //总时长
    const durationTime = currentSong.dt

    //进度
    if (!isSlider) {
      const progress = (currentTime / durationTime) * 100
      setProgress(progress)
      setCurrentTime(currentTime)
    }

    //歌词匹配
    let index = lyric?.length - 1
    for (let i = 0; i < lyric?.length; i++) {
      if (lyric[i].time > currentTime) {
        index = i - 1
        break
      }
    }
    if (lyricIndex === index || index === -1) return
    dispatch(changeLyricIndexAction(index))

    //展示歌词,key用于设置同一个key不会出现在屏幕上，加上duration配合，造成屏幕上只能渲染一句当前时间的歌词
    // if (!lyric[index].text) return message.destroy()
    // message.open({
    //   content: lyric[index].text,
    //   key: 'lyric',
    //   duration: 0
    // })
  }

  //音乐播放结束
  function handleTimeEnded() {
    if (playMode === 2) {
      audioRef.current!.currentTime = 0
      audioRef.current!.play()
    } else {
      handleCurrentSongChange(true)
    }
  }

  //改变进度掉
  function handleSliderChanged(value: number) {
    const currentTime = (value / 100) * currentSong.dt
    audioRef.current!.currentTime = Math.floor(currentTime / 1000)

    setSlider(false)
  }
  //正在改变进度条
  function handleSliderChanging(value: number) {
    setSlider(true)
    setProgress(value)

    //改变时间
    const currentTime = (value / 100) * currentSong.dt
    setCurrentTime(currentTime)
  }

  //播放模式更改
  function handlePlayModeChange() {
    const newPlayMode = (playMode + 1) % 3

    dispatch(changePlayModeAction(newPlayMode))
  }

  //下一首上一首改变,逻辑代码写在store中
  function handleCurrentSongChange(isNext = true) {
    dispatch(preOrNextSong(isNext))
  }

  return (
    <PlayBarWrapper className="sprite_playbar" text={lyric?.[lyricIndex]?.text}>
      <div className="content wrap-v2">
        <BarControl $isPlaying={isPlaying}>
          <button
            className="btn sprite_playbar prev"
            onClick={() => handleCurrentSongChange(false)}
          ></button>
          <button
            className="btn sprite_playbar play"
            onClick={handlePlayClick}
          ></button>
          <button
            className="btn sprite_playbar next"
            onClick={() => handleCurrentSongChange()}
          ></button>
        </BarControl>
        <BarPlayInfo>
          <Link to="#/discover/player">
            <img
              className="image"
              src={getImageSize(currentSong?.al?.picUrl, 50)}
              alt=""
            />
          </Link>
          <div className="info">
            <div className="song">
              <span className="song-name">{currentSong?.name}</span>
              <span className="singer-name">{currentSong?.ar?.[0]?.name}</span>
            </div>
            <div className="progress">
              <Slider
                step={0.4}
                value={progress}
                tooltip={{ formatter: null }}
                onAfterChange={handleSliderChanged}
                onChange={handleSliderChanging}
              />
              <div className="time">
                <span className="current">{formatTime(currentTime)}</span>
                <span className="divider">/</span>
                <span className="duration">{formatTime(currentSong.dt)}</span>
              </div>
            </div>
          </div>
        </BarPlayInfo>
        <BarOperator $playMode={playMode}>
          <div className="left">
            <button className="btn pip_icon pip"></button>
            <button className="btn sprite_playbar favor"></button>
            <button className="btn sprite_playbar share"></button>
          </div>
          <div className="right">
            <button className="btn sprite_playbar volume"></button>
            <button
              className="btn sprite_playbar loop"
              onClick={handlePlayModeChange}
            ></button>
            <button
              className="btn sprite_playbar playlist"
              onClick={(e) => setShow(!showPannel)}
            >
              {playSongList.length}
            </button>
          </div>
        </BarOperator>
      </div>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleTimeEnded}
      ></audio>
      {/* {showPannel && <AppPlayerPanel></AppPlayerPanel>} */}
      <div className="lyric">{lyric?.[lyricIndex]?.text}</div>
      <AppPlayerPanel isShow={showPannel}></AppPlayerPanel>
    </PlayBarWrapper>
  )
}

export default memo(PlayerBar)
