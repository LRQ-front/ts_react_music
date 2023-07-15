import myRequest from '@/service'

export const getBanner = () => {
  return myRequest.get({
    url: '/banner'
  })
}

export const getHotRecommend = (limit = 30) => {
  return myRequest.get({
    url: 'personalized',
    params: {
      limit
    }
  })
}

export const getNewAlbum = () => {
  return myRequest.get({
    url: '/album/newest'
  })
}

export const getPlayListDetail = (id: number) => {
  return myRequest.get({
    url: '/playlist/detail',
    params: {
      id
    }
  })
}

export const getArtistList = (limit = 30) => {
  return myRequest.get({
    url: '/artist/list',
    params: {
      limit
    }
  })
}
