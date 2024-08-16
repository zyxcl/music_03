"use strict";
const common_vendor = require("../common/vendor.js");
const usePlayerStore = common_vendor.defineStore("player", () => {
  const playList = common_vendor.ref(common_vendor.index.getStorageSync("playList") || []);
  const activeIndex = common_vendor.ref(common_vendor.index.getStorageSync("activeIndex") || -1);
  const pushSong = (song) => {
    const index = playList.value.findIndex((v) => v.id === song.id);
    if (index > -1) {
      activeIndex.value = index;
    } else {
      playList.value.push(song);
      activeIndex.value = playList.value.length - 1;
    }
  };
  const pushAll = (list) => {
    playList.value = list;
    activeIndex.value = 0;
  };
  common_vendor.watch([playList, activeIndex], () => {
    common_vendor.index.setStorage({
      key: "activeIndex",
      data: activeIndex.value
    });
    common_vendor.index.setStorage({
      key: "playList",
      data: playList.value
    });
  });
  return {
    activeIndex,
    playList,
    pushSong,
    pushAll
  };
});
exports.usePlayerStore = usePlayerStore;
