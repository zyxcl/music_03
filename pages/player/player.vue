<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { ref, watch } from 'vue';
import { songDetailApi, lyricApi, songUrlApi } from '../../api'
import { Song } from '../../api/type'

const song = ref<Song>({} as Song)
const lyric = ref('')
const url = ref('')
const paused = ref(true)
const duration = ref(0)
const currentTime = ref(0)

const getSongDetail = async (id: string) => {
  try {
    const res = await songDetailApi(id)
    console.log(res.data.songs[0])
    song.value = res.data.songs[0]
  } catch(e) {
    console.log(e)
  }
}
const getLyric = async (id: string) => {
  try {
    const res = await lyricApi(id)
    // console.log(res.data.lrc.lyric)
    lyric.value = res.data.lrc.lyric
    
  } catch(e) {
    uni.showToast({
      title: '获取歌词失败',
      icon: 'error'
    })
  }
}
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
  getSongDetail(options?.id)
  getLyric(options?.id)
  getSongUrl(options?.id)
})

watch(song, () => {
  uni.setNavigationBarTitle({
    title: song.value.name + '-' + song.value.ar.map((v => v.name)).join('/')
  })
})


const formatTime = (n: number) => {
  let m: number | string = Math.floor(n / 60)
  let s: number | string = Math.floor(n % 60)
  m = m >= 10 ? m : '0' + m
  s = s >= 10 ? s : '0' + s
  return `${m}:${s}`
}

// 创建播放器对象
const innerAudioContext = uni.createInnerAudioContext();
innerAudioContext.autoplay = true

innerAudioContext.onCanplay(() => {
  duration.value = innerAudioContext.duration
})
innerAudioContext.onPlay(() => {
  console.log('开始播放')
  paused.value = false
})

innerAudioContext.onPause(() => {
  console.log('暂停')
  paused.value = true
})
innerAudioContext.onError((res) => {
  console.log(res.errMsg);
  console.log(res.errCode);
})

innerAudioContext.onTimeUpdate(() => {
  currentTime.value = innerAudioContext.currentTime
})

watch(url, () => {
  innerAudioContext.src = url.value
  console.log('url赋值');
})

const play = () => {
  if (innerAudioContext.paused) {
    innerAudioContext.play()
  } else {
    innerAudioContext.pause()
  }
}

</script>

<template>
  <view class="page">
    <view class="top">
      <view class="img">
        <image :src="song.al?.picUrl" mode="widthFix"></image>
      </view>
      <view class="lyric"></view>
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
        <uni-icons type="arrow-left" size="30"></uni-icons>
        <view @click="play">
          <uni-icons v-if="paused" type="circle-filled" size="30"></uni-icons>
          <uni-icons v-else type="arrow-up" size="30"></uni-icons>
        </view>
        <uni-icons type="arrow-right" size="30"></uni-icons>
        <uni-icons type="settings-filled" size="30"></uni-icons>
      </view>
    </view>
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
</style>
