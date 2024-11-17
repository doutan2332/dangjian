// pages/my/myAgenda/myAgenda.js
const db = wx.cloud.database()
const app = getApp()

Page({
  data: {
    myBooking: []
  },
  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {
    this.getBooking()
  },
  getBooking() {
    db.collection("community_resident_appointment").orderBy('time', 'desc')
    .where({
      community_id: app.globalData.myopenid
    }).get({
      success: res => {
        console.log(res.data)
        this.setData({
          myBooking: res.data
        })
      }
    })
  },
  toChat(e) {
    let index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '/pages/chat/chat?id=' + this.data.myBooking[index].resident_id,
    })
  }
})