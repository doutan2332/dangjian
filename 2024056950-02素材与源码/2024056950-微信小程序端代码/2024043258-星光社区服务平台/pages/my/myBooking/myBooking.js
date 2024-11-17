// pages/my/myBooking/myBooking.js
const db = wx.cloud.database()
const app = getApp()
Page({
  data: {
    communistList: []
  },

  onLoad: function (options) {

  },

  onShow: function () {
    db.collection('community_resident_appointment').where({
      resident_id: app.globalData.myopenid
    }).get({
      success: res => {
        this.setData({
          communistList: res.data
        })
      }
    })
  },
  toChat(e) {
    let index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '/pages/chat/chat?id=' + this.data.communistList[index].community_id,
    })
  }
  
})