<script setup lang="ts">
import { ref } from 'vue'
import { bannerApi, personalizedApi } from '../../api'
import type { BannerItem, PersonalizedItem } from '../../api/type'
import { ballList } from './ball'

const goSearch = () => {
  uni.navigateTo({
    url: "/pages/search/search"
  })
}

const banners = ref<BannerItem[]>([])
const playlist = ref<PersonalizedItem[]>([])

bannerApi().then(res => {
  banners.value = res.data.banners
})


personalizedApi().then(res => {
  playlist.value = res.data.result
})


const goDetail = (id: number) => {
  uni.navigateTo({
    url: `/pages/songList/songList?id=${id}`
  })
}
</script>

<template>
	<view class="header">
    <uni-icons type="list" size="30"></uni-icons>
    <view class="goSearch" @click="goSearch">搜索</view>
  </view>
  
  <view class="swiper-wrap">
    <swiper indicator-dots>
      <swiper-item v-for="item in banners" :key="item.targetId">
        <image :src="item.imageUrl" mode="widthFix"></image>
      </swiper-item>
    </swiper>
  </view>
  
  <scroll-view scroll-x enable-flex style="flex-direction: row;">
    <view class="ball-wrap">
      <view class="ball" v-for="item in ballList" :key="item.id">
        <image :src="item.iconUrl" mode="widthFix"></image>
        <view class="">
          {{item.name}}
        </view>
      </view>
    </view>
  </scroll-view>
  
  <uni-section title="推荐歌单" type="line"></uni-section>

  <scroll-view scroll-x enable-flex style="flex-direction: row;">
    <view class="list-wrap">
      <view class="song" v-for="item in playlist" :key="item.id" @click="goDetail(item.id)">
        <view class="pic">
          <image :src="item.picUrl" mode="widthFix"></image>
        </view>
        <view class="">
          {{item.name}}
        </view>
      </view>
    </view>
  </scroll-view>
  
  
</template>

<style lang="scss" scoped>
.header {
  padding: 20rpx;
  display: flex;
  width: 100%;
  .goSearch {
    flex: 1;
    background: #dddddd;
  }
}
.swiper-wrap {
  padding: 30rpx;
  swiper {
    width: 690rpx;
    height: 256rpx;
    overflow: hidden;
    border-radius: 14rpx;
  }
  image {
    width: 100%;
  }
}
.ball-wrap {
  width: 100%;
  display: flex;
  .ball {
    width: 20%;
    flex-shrink: 0;
    text-align: center;
    font-size: 12px;
    image {
      width: 50%;
      height: 40px;
      border-radius: 50%;
      background: tomato;
    }
  }
}
.list-wrap {
  width: 100%;
  display: flex;
  .song {
    width: 250rpx;
    margin-left: 20rpx;
    padding: 20rpx 0;
    font-size: 12px;
    .pic {
      width: 250rpx;
      height: 250rpx;
      overflow: hidden;
      border-radius: 20rpx;
    }
    image {
      width: 250rpx;
      height: 250rpx;
    }
  }
}
</style>
