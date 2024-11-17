// pages/partyAvaluate/partyAvaluate.js
const db=wx.cloud.database()
const app = getApp()
Page({
  data: {
    communistList: []
  },
  onLoad(options) {

  },
  onShow() {
    db.collection("community_resident_appointment").where({
      resident_id: app.globalData.myopenid
    }).get({
      success: res => {
        let obj = {}
        let tmp = res.data.reduce((preVal, curVal) => {
          obj[curVal.community_id] ? "" : obj[curVal.community_id] = preVal.push(curVal)
          return preVal 
        }, [])
        this.setData({
          communistList: tmp
        })
      }
    })
  },
  toAvaluate(e) {
    let target = e.currentTarget.dataset.target;
    console.log("进入评价页面", target)
    wx.navigateTo({
      url: '/pages/partyAvaluate/detail/detail?id=' + target,
    })
  }
})