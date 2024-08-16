"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
const stores_player = require("../../stores/player.js");
require("../../api/request.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_section2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_section + _easycom_uni_popup)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "player",
  setup(__props) {
    var _a;
    const playerStore = stores_player.usePlayerStore();
    const app = getApp();
    const popup = common_vendor.ref(null);
    const showLyric = common_vendor.ref(false);
    const lyric = common_vendor.ref([]);
    const url = common_vendor.ref("");
    const paused = common_vendor.ref(true);
    const duration = common_vendor.ref(0);
    const currentTime = common_vendor.ref(0);
    function parseLyrics(lyrics) {
      const regex = /\[(\d{2}:\d{2}\.\d{2})\](.*)/;
      const entries = lyrics.split("\n").map((line) => {
        const match = line.match(regex);
        if (match) {
          const [m, s] = match[1].split(":");
          const time = Number(m) * 60 + Number(s) * 1;
          return { time, text: match[2].trim() };
        }
        return null;
      }).filter(Boolean);
      return entries;
    }
    const getLyric = async (id) => {
      try {
        const res = await api_index.lyricApi(id);
        lyric.value = parseLyrics(res.data.lrc.lyric);
        console.log(parseLyrics(res.data.lrc.lyric));
      } catch (e) {
        common_vendor.index.showToast({
          title: "获取歌词失败",
          icon: "error"
        });
      }
    };
    const getSongUrl = async (id) => {
      try {
        const res = await api_index.songUrlApi(id);
        url.value = res.data.data[0].url;
      } catch (e) {
        common_vendor.index.showToast({
          title: "获取播放地址失败",
          icon: "error"
        });
      }
    };
    common_vendor.onLoad(async (options) => {
      getLyric(options == null ? void 0 : options.id);
      getSongUrl(options == null ? void 0 : options.id);
    });
    const song = common_vendor.computed(() => {
      return playerStore.playList[playerStore.activeIndex];
    });
    common_vendor.watchEffect(() => {
      common_vendor.index.setNavigationBarTitle({
        title: song.value.name + "-" + song.value.ar.map((v) => v.name).join("/")
      });
    });
    const formatTime = (n) => {
      let m = Math.floor(n / 60);
      let s = Math.floor(n % 60);
      m = m >= 10 ? m : "0" + m;
      s = s >= 10 ? s : "0" + s;
      return `${m}:${s}`;
    };
    const innerAudioContext = (_a = app.globalData) == null ? void 0 : _a.innerAudioContex;
    innerAudioContext.autoplay = true;
    innerAudioContext.onCanplay(() => {
      duration.value = innerAudioContext.duration;
    });
    innerAudioContext.onPlay(() => {
      paused.value = false;
    });
    innerAudioContext.onPause(() => {
      paused.value = true;
    });
    innerAudioContext.onEnded(() => {
      changeSong(1);
    });
    innerAudioContext.onTimeUpdate(() => {
      currentTime.value = innerAudioContext.currentTime;
    });
    common_vendor.watch(url, () => {
      innerAudioContext.src = url.value;
    });
    const play = () => {
      if (innerAudioContext.paused) {
        innerAudioContext.play();
      } else {
        innerAudioContext.pause();
      }
    };
    const open = () => {
      popup.value.open("bottom");
    };
    const changeSong = (n) => {
      let index = playerStore.activeIndex + n;
      if (index < 0) {
        index = playerStore.playList.length - 1;
      }
      if (index > playerStore.playList.length - 1) {
        index = 0;
      }
      playerStore.activeIndex = index;
      common_vendor.index.redirectTo({
        url: `/pages/player/player?id=${song.value.id}`
      });
    };
    return (_ctx, _cache) => {
      var _a2;
      return common_vendor.e({
        a: showLyric.value
      }, showLyric.value ? {
        b: common_vendor.f(lyric.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.text),
            b: item.time
          };
        })
      } : {
        c: (_a2 = common_vendor.unref(song).al) == null ? void 0 : _a2.picUrl
      }, {
        d: common_vendor.o(($event) => showLyric.value = !showLyric.value),
        e: common_vendor.p({
          type: "heart",
          size: "30"
        }),
        f: common_vendor.p({
          type: "chat",
          size: "30"
        }),
        g: common_vendor.t(formatTime(currentTime.value)),
        h: currentTime.value / duration.value * 100,
        i: common_vendor.t(formatTime(duration.value)),
        j: common_vendor.p({
          type: "refreshempty",
          size: "30"
        }),
        k: common_vendor.o(($event) => changeSong(-1)),
        l: common_vendor.p({
          type: "arrow-left",
          size: "30"
        }),
        m: paused.value
      }, paused.value ? {
        n: common_vendor.p({
          type: "arrow-up",
          size: "30"
        })
      } : {
        o: common_vendor.p({
          type: "circle-filled",
          size: "30"
        })
      }, {
        p: common_vendor.o(play),
        q: common_vendor.o(($event) => changeSong(1)),
        r: common_vendor.p({
          type: "arrow-right",
          size: "30"
        }),
        s: common_vendor.o(open),
        t: common_vendor.p({
          type: "settings-filled",
          size: "30"
        }),
        v: common_vendor.f(common_vendor.unref(playerStore).playList, (item, index, i0) => {
          return {
            a: item.id,
            b: "0391012f-11-" + i0 + ",0391012f-10",
            c: common_vendor.p({
              title: item.name,
              note: item.ar.map((v) => v.name).join("/"),
              thumb: item.al.picUrl,
              rightText: common_vendor.unref(playerStore).activeIndex === index ? "正在播放" : ""
            })
          };
        }),
        w: common_vendor.p({
          title: "播放列表",
          type: "line"
        }),
        x: common_vendor.sr(popup, "0391012f-8", {
          "k": "popup"
        }),
        y: common_vendor.p({
          ["border-radius"]: "10px 10px 0 0"
        })
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0391012f"], ["__file", "/Users/zhaoyaxiang/Desktop/music_03/pages/player/player.vue"]]);
wx.createPage(MiniProgramPage);
