// pages/notice/detail/detail.js
const app = getApp()
Page({
  data: {
    noticeInfo: {}
  },

  onLoad: function (options) {
    let id = options.id
    let res = app.globalData.newsList.filter((item) => item.id == id)
    let obj = res[0]
    let date = obj.date.substring(0, 10)
    this.setData({
      noticeInfo: obj,
      date: date
    })
  },


  onShow: function () {

  }
})