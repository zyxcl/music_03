import { request } from './request'
import type {
  BannerRes,
  PersonalizedRes,
  PlaylistDetailRes,
  CommentPlaylistRes
} from './type'


// 轮播图
export const bannerApi = () => {
  return request<BannerRes>({
    url: 'https://zyxcl.xyz/music/api/banner'
  })
}



// 推荐歌单
export const personalizedApi = () => {
  return request<PersonalizedRes>({
    url: 'https://zyxcl.xyz/music/api/personalized'
  })
}

// 歌单详情
export const playlistDetailApi = (id: string) => {
  return request<PlaylistDetailRes>({
    url: 'https://zyxcl.xyz/music/api/playlist/detail',
    data: {
      id
    }
  })
}

// 歌单评论
export const commentPlaylistApi = (id: string) => {
  return request<CommentPlaylistRes>({
    url: 'https://zyxcl.xyz/music/api/comment/playlist',
    data: {
      id
    }
  })
}

