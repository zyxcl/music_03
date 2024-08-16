


// 轮播图接口
export interface BannerItem {
  imageUrl: string;
  targetId: number;
}
export interface BannerRes {
  code: number;
  banners: BannerItem[]
}




// 推荐歌单接口
export interface PersonalizedItem {
  id: number;
  name: string;
  picUrl: string;
  playCount: number;
  trackCount: number;
  trackNumberUpdateTime: number;
}
export interface PersonalizedRes {
  code: number;
  result: PersonalizedItem[];
}


// 歌单详情接口
export interface Song {
  name: string;
  id: number;
  ar: { id: number; name: string; }[];
  al: {
    id: number;
    name: string;
    picUrl: string;
  }
}
export interface PlaylistDetail {
  description: string;
  coverImgUrl: string;
  name: string;
  tags: string[];
  playCount: number;
  id: number;
  creator: {
    avatarUrl: string;
    nickname: string;
  };
  tracks: Song[];
}
export interface PlaylistDetailRes {
  code: number;
  playlist: PlaylistDetail;
}

// 歌单评论
export interface CommentItem {
  commentId: number;
  content: string;
  richContent: string;
  ipLocation: {
    location: string;
  }
  timeStr: string;
  time: number;
  user: {
    nickname: string;
    userId: number;
    avatarUrl: string;
  }
}
export interface CommentPlaylistRes {
  comments: CommentItem[];
  hotComments: CommentItem[];
  total: number;
}

// 歌曲详情
export interface SongDetailRes {
  code: number;
  songs: Song[];
}
// 歌词
export interface LyricRes {
  lrc: {
    lyric: string;
  }
}
// 音乐url
export interface SongUrl {
  url: string;
  time: number;
  id: number;
}
export interface SongUrlRes {
  code: number;
  data: SongUrl[];
}