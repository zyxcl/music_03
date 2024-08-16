"use strict";
const common_vendor = require("../common/vendor.js");
const request = ({
  url,
  method = "GET",
  data = {}
}) => {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url,
      method,
      data,
      success: (res) => {
        resolve(res);
      },
      fail: (e) => {
        reject(e);
      }
    });
  });
};
exports.request = request;
