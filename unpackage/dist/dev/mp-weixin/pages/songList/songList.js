"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
const stores_player = require("../../stores/player.js");
require("../../api/request.js");
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_section2 + _easycom_uni_popup2)();
}
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_list + _easycom_uni_section + _easycom_uni_popup)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "songList",
  setup(__props) {
    const playerStore = stores_player.usePlayerStore();
    const popup = common_vendor.ref(null);
    const playlistDetail = common_vendor.ref({});
    const hotComments = common_vendor.ref([]);
    const comments = common_vendor.ref([]);
    const getDetail = async (id) => {
      const res = await api_index.playlistDetailApi(id);
      playlistDetail.value = res.data.playlist;
    };
    const getComment = async (id) => {
      const res = await api_index.commentPlaylistApi(id);
      comments.value = res.data.comments;
      hotComments.value = res.data.hotComments;
    };
    common_vendor.onLoad(async (options) => {
      getDetail(options == null ? void 0 : options.id);
      getComment(options == null ? void 0 : options.id);
    });
    const open = () => {
      popup.value.open("bottom");
    };
    const goPlayer = (item) => {
      playerStore.pushSong(item);
      common_vendor.index.navigateTo({
        url: `/pages/player/player?id=${item.id}`
      });
    };
    const playAll = () => {
      playerStore.pushAll(playlistDetail.value.tracks);
      const id = playlistDetail.value.tracks[0].id;
      common_vendor.index.navigateTo({
        url: `/pages/player/player?id=${id}`
      });
    };
    return (_ctx, _cache) => {
      var _a, _b;
      return {
        a: playlistDetail.value.coverImgUrl,
        b: common_vendor.t(playlistDetail.value.name),
        c: (_a = playlistDetail.value.creator) == null ? void 0 : _a.avatarUrl,
        d: common_vendor.t((_b = playlistDetail.value.creator) == null ? void 0 : _b.nickname),
        e: common_vendor.t(playlistDetail.value.description),
        f: playlistDetail.value.coverImgUrl,
        g: common_vendor.o(open),
        h: common_vendor.o(playAll),
        i: common_vendor.p({
          title: "播放全部",
          link: true,
          clickable: true
        }),
        j: common_vendor.f(playlistDetail.value.tracks, (item, index, i0) => {
          return {
            a: common_vendor.t(index + 1),
            b: item.id,
            c: common_vendor.o(($event) => goPlayer(item), item.id),
            d: "6c9c8a2a-2-" + i0 + ",6c9c8a2a-0",
            e: common_vendor.p({
              title: item.name,
              note: item.ar.map((v) => v.name).join("/"),
              link: true,
              clickable: true,
              rightText: common_vendor.unref(playerStore).activeIndex === index ? "正在播放" : ""
            })
          };
        }),
        k: common_vendor.f(hotComments.value, (item, k0, i0) => {
          return {
            a: item.commentId,
            b: "6c9c8a2a-6-" + i0 + ",6c9c8a2a-5",
            c: common_vendor.p({
              title: item.user.nickname,
              note: item.content,
              thumb: item.user.avatarUrl
            })
          };
        }),
        l: common_vendor.p({
          title: "热门评论",
          type: "line"
        }),
        m: common_vendor.f(comments.value, (item, k0, i0) => {
          return {
            a: item.commentId,
            b: "6c9c8a2a-9-" + i0 + ",6c9c8a2a-8",
            c: common_vendor.p({
              title: item.user.nickname,
              note: item.content,
              thumb: item.user.avatarUrl
            })
          };
        }),
        n: common_vendor.p({
          title: "最新评论",
          type: "line"
        }),
        o: common_vendor.sr(popup, "6c9c8a2a-3", {
          "k": "popup"
        }),
        p: common_vendor.p({
          ["border-radius"]: "10px 10px 0 0"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6c9c8a2a"], ["__file", "/Users/zhaoyaxiang/Desktop/music_03/pages/songList/songList.vue"]]);
wx.createPage(MiniProgramPage);
