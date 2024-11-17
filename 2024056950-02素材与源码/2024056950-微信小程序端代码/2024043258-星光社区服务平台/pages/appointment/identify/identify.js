// pages/appointment/identify/identify.js
const db = wx.cloud.database()
const app = getApp()
const util = require("../../../utils/util")
let id;
let time
Page({
  data: {

  },
  onLoad: function (options) {
    id = options.id;
    time = options.time
    console.log("id=", id, ",time=", time)
    let date = time.substring(0, time.indexOf(' '));//日期
    let span = time.substring(time.indexOf(' '))
    this.setData({
      date: date,
      time: span
    })
    //查询党员所在社区、日期、时间、职业
    var that = this;
    db.collection("community_users").where({
      _openid: id
    }).get({
      success(res) {
        let tmp = res.data[0]
        that.setData({
          address: tmp.address,
          name: tmp.realName,
          occupation: tmp.occupation,
          community_faceImg: tmp.faceImg
        })
      }
    })
  },
  //立即预约
  confirm() {

    var that = this;
    wx.showModal({
      title: '确认预约',
      content: '',
      cancelText: '取消',
      confirmText: '确认',
      success(res) {
        if (res.confirm) {
          console.log("确认预约")
          //1.将我的预约信息添加到到数据库中
          db.collection('community_resident_appointment')
            .add({
              data: {
                resident_id: app.globalData.myopenid,
                community_id: id,
                community_name: that.data.name,
                community_occupation: that.data.occupation,
                community_faceImg: that.data.community_faceImg,
                resident_nickName: app.globalData.userInfo.nickName,
                resident_faceImg: app.globalData.userInfo.faceImg,
                date: that.data.date,
                time: that.data.time,
                date_time: time
              },
              success(res) {
                wx.navigateBack({
                  delta: 1,
                })
                wx.showToast({
                  title: '预约成功',
                })
              }
            })
        }
      }
    })
  },
  onReady: function () {

  },
  onShow: function () {

  },
})