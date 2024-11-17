// pages/index/newsDetail/newsDetail.js
const db = wx.cloud.database()
const app = getApp()
Page({
  data: {
    newsInfo: {},

  },
  onLoad: function (options) {
    let id = options.id
    console.log("新闻列表", app.globalData.newsList)
    let res = app.globalData.newsList.filter((item) => item.id == id)
    let obj = res[0]
    let date = obj.date.substring(0, 10)
    this.setData({
      newsInfo: obj,
      date: date
    })
  }
})