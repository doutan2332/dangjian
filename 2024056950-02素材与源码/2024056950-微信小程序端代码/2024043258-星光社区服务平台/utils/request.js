// const baseUrl = "http://124.223.28.171:8888"
// const baseUrl = "https://www.cqnu.club/api:8888"
// const baseUrl = "http://127.0.0.1:8888"
// const baseUrl = "https://www.cqnu.club"

const baseUrl = "http://127.0.0.1:9999"

const http = (options, callback, errFun) => {
  wx.request({
    url: baseUrl + options.url,
    method: options.method,
    data: JSON.stringify(options.data),
    header: { 'content-type': 'application/json;charset=UTF-8' },
    success: function (res) {

      callback(res.data);
    },
    fail: function (err) {
      errFun(err);
    }
  })
}
module.exports = {
  http
}