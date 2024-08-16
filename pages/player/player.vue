<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { computed, ref, watch, watchEffect } from 'vue';
import { songDetailApi, lyricApi, songUrlApi } from '../../api'
import { Song } from '../../api/type'
import { usePlayerStore } from '../../stores/player'
  
const playerStore = usePlayerStore()
const app = getApp()
const popup = ref<any>(null)

const showLyric = ref(false)
const lyric = ref<{ time: number; text: string; }[]>([])
const url = ref('')
const paused = ref(true)
const duration = ref(0)
const currentTime = ref(0)

function parseLyrics(lyrics: string) {
  // 定义一个正则表达式来匹配时间戳和歌词文本
  const regex = /\[(\d{2}:\d{2}\.\d{2})\](.*)/;
  // 使用正则表达式分割字符串，得到包含时间戳和文本的数组
  const entries = lyrics.split('\n').map(line => {
    const match = line.match(regex);
    if (match) {
      const [m, s] = match[1].split(':')
      const time = Number(m) * 60 + Number(s) * 1
      // 返回一个包含时间戳和文本的对象
      return { time, text: match[2].trim() };
    }
    return null;
  }).filter(Boolean)

  return entries;
}

// 歌词
const getLyric = async (id: string) => {
  try {
    const res = await lyricApi(id)
    lyric.value = parseLyrics(res.data.lrc.lyric)
    console.log(parseLyrics(res.data.lrc.lyric));
    
  } catch(e) {
    uni.showToast({
      title: '获取歌词失败',
      icon: 'error'
    })
  }
}
// 播放的url
const getSongUrl = async (id: string) => {
  try {
    const res = await songUrlApi(id)
    url.value = res.data.data[0].url
  } catch(e) {
    uni.showToast({
      title: '获取播放地址失败',
      icon: 'error'
    })
  }
}


onLoad(async (options) => {
  getLyric(options?.id)
  getSongUrl(options?.id)
})
// 从store中获取数据
const song = computed(() => {
  return playerStore.playList[playerStore.activeIndex]
})

// 修改标题
watchEffect(() => {
  uni.setNavigationBarTitle({
    title: song.value.name + '-' + song.value.ar.map((v => v.name)).join('/')
  })
})

// 格式化时间
const formatTime = (n: number) => {
  let m: number | string = Math.floor(n / 60)
  let s: number | string = Math.floor(n % 60)
  m = m >= 10 ? m : '0' + m
  s = s >= 10 ? s : '0' + s
  return `${m}:${s}`
}

// 创建播放器对象
const innerAudioContext = app.globalData?.innerAudioContex
innerAudioContext.autoplay = true
innerAudioContext.onCanplay(() => {
  duration.value = innerAudioContext.duration
})
innerAudioContext.onPlay(() => {
  paused.value = false
})
innerAudioContext.onPause(() => {
  paused.value = true
})
innerAudioContext.onEnded(() => {
  changeSong(1)
})

innerAudioContext.onTimeUpdate(() => {
  currentTime.value = innerAudioContext.currentTime
})

// 修改播放地址
watch(url, () => {
  innerAudioContext.src = url.value  
})

// 播放暂停
const play = () => {
  if (innerAudioContext.paused) {
    innerAudioContext.play()
  } else {
    innerAudioContext.pause()
  }
}

// 展示播放列表
const open = () => {
  popup.value.open('bottom')
}
// 下一首
const changeSong = (n: number) => {
  let index = playerStore.activeIndex + n
  if (index < 0) {
    index = playerStore.playList.length - 1
  }
  if (index > playerStore.playList.length - 1) {
    index = 0
  }
  playerStore.activeIndex = index
  uni.redirectTo({
    url: `/pages/player/player?id=${song.value.id}`
  })
}
</script>

<template>
  <view class="page">
    <view class="top" @click="showLyric = !showLyric">
      <scroll-view class="lyric" v-if="showLyric" scroll-y>
        <view class="lyric-row" v-for="item in lyric" :key="item.time">
          {{item.text}}
        </view>
      </scroll-view>
      <view class="img" v-else>
        <image :src="song.al?.picUrl" mode="widthFix"></image>
      </view>
    </view>
    <view class="controller">
      <view class="icons">
        <uni-icons type="heart" size="30"></uni-icons>
        <uni-icons type="chat" size="30"></uni-icons>
      </view>
      <view class="progress">
        <view class="time">{{formatTime(currentTime)}}</view>
        <progress class="pro" :percent="currentTime / duration * 100" stroke-width="3" />
        <view class="time">{{formatTime(duration)}}</view>
      </view>
      <view class="btns">
        <uni-icons type="refreshempty" size="30"></uni-icons>
        <uni-icons type="arrow-left" size="30" @click="changeSong(-1)"></uni-icons>
        <view @click="play">
          <uni-icons v-if="paused" type="arrow-up" size="30"></uni-icons>
          <uni-icons v-else  type="circle-filled" size="30"></uni-icons>
        </view>
        <uni-icons type="arrow-right" size="30" @click="changeSong(1)"></uni-icons>
        <uni-icons type="settings-filled" size="30" @click="open"></uni-icons>
      </view>
    </view>
  
    
    
    <uni-popup ref="popup" border-radius="10px 10px 0 0">
      <scroll-view class="popup-list" scroll-y>
        <uni-section title="播放列表" type="line">
          <uni-list>
          	<uni-list-item
              v-for="(item, index) in playerStore.playList"
              :key="item.id"
              :title="item.name"
              :note="item.ar.map(v => v.name).join('/')"
              :thumb="item.al.picUrl"
              :rightText="playerStore.activeIndex === index ? '正在播放' : ''"
            >
            </uni-list-item>
          </uni-list>
        </uni-section>
      </scroll-view>
    </uni-popup>
  </view>
</template>

<style lang="scss" scoped>
uni-page-body {
  width: 100%;
  height: 100%;
}
.page {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.top {
  flex: 1;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
.img {
  width: 500rpx;
  height: 500rpx;
  background: #ccc;
  border-radius: 50%;
  overflow: hidden;
  image {
    width: 100%;
    height: 100%;
  }
}
.controller {
  height: 300rpx;
  display: flex;
  flex-direction: column;
}
.icons {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}
.progress {
  flex: 1;
  display: flex;
  align-items: center;
  .pro {
    flex: 1;
  }
  .time {
    width: 100rpx;
    text-align: center;
  }
}
.btns {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.popup-list {
  max-height: 800rpx;
}
.lyric {
  max-height: 800rpx;
  text-align: center;
}
.lyric-row {
  padding: 10rpx 0;
}
</style>
