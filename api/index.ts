import { request } from './request'
import type {
  BannerRes,
  PersonalizedRes,
  PlaylistDetailRes,
  CommentPlaylistRes,
  SongDetailRes,
  LyricRes,
  SongUrlRes
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


// 歌曲详情
export const songDetailApi = (ids: string | number) => {
  return request<SongDetailRes>({
    url: 'https://zyxcl.xyz/music/api/song/detail',
    data: {
      ids
    }
  })
}
// 歌词
export const lyricApi = (id: string | number) => {
  return request<LyricRes>({
    url: 'https://zyxcl.xyz/music/api/lyric',
    data: {
      id
    }
  })
}
// 音乐url
export const songUrlApi = (id: string | number) => {
  return request<SongUrlRes>({
    url: 'https://zyxcl.xyz/music/api/song/url',
    data: {
      id
    }
  })
}