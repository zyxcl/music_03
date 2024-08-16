import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { Song } from '../api/type'

export const usePlayerStore = defineStore('player', () => {

  // 播放列表中的所有歌曲
  const playList = ref<Song[]>(uni.getStorageSync('playList') || [])
  // 正在播放的下标
  const activeIndex = ref(uni.getStorageSync('activeIndex') || -1)
  
  const pushSong = (song: Song) => {
    const index = playList.value.findIndex((v => v.id === song.id))
    if (index > -1) {
      activeIndex.value = index
    } else {
      playList.value.push((song))
      activeIndex.value = playList.value.length - 1
    }
  }
  
  const pushAll = (list: Song[]) => {
    playList.value = list
    activeIndex.value = 0
  }
  
  watch([playList, activeIndex], () => {
    uni.setStorage({
    	key: 'activeIndex',
    	data: activeIndex.value
    })
    uni.setStorage({
    	key: 'playList',
    	data: playList.value
    })
  })
  
  
  
  return {
    activeIndex,
    playList,
    pushSong,
    pushAll
  }
})