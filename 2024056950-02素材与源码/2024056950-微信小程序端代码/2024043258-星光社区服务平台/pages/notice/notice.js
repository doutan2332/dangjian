// pages/notice/notice.js
const Api = require("../../utils/request")
const app = getApp()
Page({

  data: {
    announcementList: []
  },

  getNotice() {
    var that = this
    Api.http({
      url: '/news/announcement/' + app.globalData.userInfo.address,
      data: '',
      method: 'GET'
    },
      (res) => {
        console.log("获取公告", res.data);
        that.setData({
          announcementList: res.data
        })
      },
      (err) => {
        console.log("获取公告失败")
      }
    )
  },
  onLoad: function (options) {
    this.getNotice()
  },

  //获取公告详情页
  goNoticeDetail(e) {
    wx.navigateTo({
      url: './detail/detail?id=' + e.currentTarget.dataset.id,
    })
  },
  onReady: function () {

  },

  onShow: function () {

  },
})