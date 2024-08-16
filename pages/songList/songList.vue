<script setup lang="ts">
import { ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { playlistDetailApi, commentPlaylistApi } from '../../api'
import type { PlaylistDetail, CommentItem } from '../../api/type'
  
const popup = ref<any>(null)

const playlistDetail = ref<PlaylistDetail>({} as PlaylistDetail)  
const hotComments = ref<CommentItem[]>([])
const comments = ref<CommentItem[]>([])

// 详情接口
const getDetail = async (id: string) => {
  const res = await playlistDetailApi(id)
  playlistDetail.value = res.data.playlist
}
// 评论接口
const getComment = async (id: string) => {
  const res = await commentPlaylistApi(id)
  comments.value = res.data.comments
  hotComments.value = res.data.hotComments
}

onLoad(async (options) => {
  getDetail(options?.id)
  getComment(options?.id)
})

const open = () => {
  popup.value.open('bottom')
}
const goPlayer = (id: number) => {
  uni.navigateTo({
    url: `/pages/player/player?id=${id}`
  })
}
</script>

<template>
  <view class="header-wrap">
    <view class="header">
      <image class="coverImg" :src="playlistDetail.coverImgUrl" mode="widthFix"></image>
      <view class="info">
        <view class="title">
          {{playlistDetail.name}}
        </view>
        <view class="creator">
          <image class="avatar" :src="playlistDetail.creator?.avatarUrl" mode="widthFix"></image>
          <view class="nickname">
            {{playlistDetail.creator?.nickname}}
          </view>
        </view>
      </view>
    </view>
    <view class="desc">
      {{playlistDetail.description}}
    </view>
    <view class="bg">
      <image :src="playlistDetail.coverImgUrl" mode="widthFix"></image>
      <view class="mask"></view>
    </view>
    <view class="btns">
      <button size="mini" @click="open">评论</button>
    </view>
  </view>
  
  <view class="songlist">
    <uni-list>
      <uni-list-item title="播放全部" link clickable></uni-list-item>
    	<uni-list-item
        v-for="(item, index) in playlistDetail.tracks"
        :key="item.id"
        :title="item.name"
        :note="item.ar.map(v => v.name).join('/')"
        link
        clickable
        @click="goPlayer(item.id)"
      >
      <!-- 自定义 header -->
        <template v-slot:header>
          <view class="no">{{index + 1}}</view>
        </template>
      </uni-list-item>
    </uni-list>
  </view>

  <uni-popup ref="popup" border-radius="10px 10px 0 0">
    <scroll-view class="popup-list" scroll-y>
      <uni-section title="热门评论" type="line">
        <uni-list>
        	<uni-list-item
            v-for="item in hotComments"
            :key="item.commentId"
            :title="item.user.nickname"
            :note="item.content"
            :thumb="item.user.avatarUrl"
          >
          </uni-list-item>
        </uni-list>
      </uni-section>
      <uni-section title="最新评论" type="line">
        <uni-list>
        	<uni-list-item
            v-for="item in comments"
            :key="item.commentId"
            :title="item.user.nickname"
            :note="item.content"
            :thumb="item.user.avatarUrl"
          >
          </uni-list-item>
        </uni-list>
      </uni-section>
      
    </scroll-view>
  </uni-popup>

</template>

<style lang="scss" scoped>
.header-wrap {
  overflow: hidden;
  position: relative;
  z-index: 1;
  height: 436rpx;
}
.header {
  padding: 30rpx;
  display: flex;
  color: #ffffff;
  .coverImg {
    width: 220rpx;
    height: 220rpx;
  }
  .info {
    flex: 1;
    padding-left: 20rpx;
  }
  .title {
    font-size: 16px;
    font-weight: bold;
  }
  .creator {
    margin-top: 30rpx;
    display: flex;
  }
  .avatar {
    width: 60rpx;
    height: 60rpx;
    border-radius: 50%;
    margin-right: 20rpx;
  }
}
.desc {
  padding: 20rpx;
  color: #ffffff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.bg {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  image {
    width: 100%;
    filter: blur(20px);
  }
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(139, 139, 139, 0.5);
  }
}
.no {
  width: 80rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
.popup-list {
  max-height: 1100rpx;
}
</style>
