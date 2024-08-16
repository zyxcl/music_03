"use strict";
const api_request = require("./request.js");
const bannerApi = () => {
  return api_request.request({
    url: "https://zyxcl.xyz/music/api/banner"
  });
};
const personalizedApi = () => {
  return api_request.request({
    url: "https://zyxcl.xyz/music/api/personalized"
  });
};
const playlistDetailApi = (id) => {
  return api_request.request({
    url: "https://zyxcl.xyz/music/api/playlist/detail",
    data: {
      id
    }
  });
};
const commentPlaylistApi = (id) => {
  return api_request.request({
    url: "https://zyxcl.xyz/music/api/comment/playlist",
    data: {
      id
    }
  });
};
const lyricApi = (id) => {
  return api_request.request({
    url: "https://zyxcl.xyz/music/api/lyric",
    data: {
      id
    }
  });
};
const songUrlApi = (id) => {
  return api_request.request({
    url: "https://zyxcl.xyz/music/api/song/url",
    data: {
      id
    }
  });
};
exports.bannerApi = bannerApi;
exports.commentPlaylistApi = commentPlaylistApi;
exports.lyricApi = lyricApi;
exports.personalizedApi = personalizedApi;
exports.playlistDetailApi = playlistDetailApi;
exports.songUrlApi = songUrlApi;
