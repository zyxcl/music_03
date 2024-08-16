"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
const pages_index_ball = require("./ball.js");
require("../../api/request.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_icons2 + _easycom_uni_section2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_section)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const goSearch = () => {
      common_vendor.index.navigateTo({
        url: "/pages/search/search"
      });
    };
    const banners = common_vendor.ref([]);
    const playlist = common_vendor.ref([]);
    api_index.bannerApi().then((res) => {
      banners.value = res.data.banners;
    });
    api_index.personalizedApi().then((res) => {
      playlist.value = res.data.result;
    });
    const goDetail = (id) => {
      common_vendor.index.navigateTo({
        url: `/pages/songList/songList?id=${id}`
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "list",
          size: "30"
        }),
        b: common_vendor.o(goSearch),
        c: common_vendor.f(banners.value, (item, k0, i0) => {
          return {
            a: item.imageUrl,
            b: item.targetId
          };
        }),
        d: common_vendor.f(common_vendor.unref(pages_index_ball.ballList), (item, k0, i0) => {
          return {
            a: item.iconUrl,
            b: common_vendor.t(item.name),
            c: item.id
          };
        }),
        e: common_vendor.p({
          title: "推荐歌单",
          type: "line"
        }),
        f: common_vendor.f(playlist.value, (item, k0, i0) => {
          return {
            a: item.picUrl,
            b: common_vendor.t(item.name),
            c: item.id,
            d: common_vendor.o(($event) => goDetail(item.id), item.id)
          };
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"], ["__file", "/Users/zhaoyaxiang/Desktop/music_03/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
