// pages/message/message.js
const app = getApp();
Page({

  data: {
    myMessages: [], //消息列表
  },

  getMessageList() {
    var that = this;
    const _ = wx.cloud.database().command;
    wx.cloud.database().collection("community_record").orderBy('time', 'desc').where(
      _.or([
        {
          userA_id: app.globalData.openid
        },
        {
          userB_id: app.globalData.openid
        }
      ])
    ).get({
      success(res) {
        console.log(res.data)
        that.setData({
          myMessages: res.data
        })
      }
    })
  },

  onLoad: function (options) {
    //获取openid
    this.setData({
      myid: app.globalData.openid
    })
    //获取我的消息
    this.getMessageList()
  },
  //用户点击了头像 跳转到聊天页面
  toChat(e) {
    let index = e.currentTarget.dataset.index
    console.log("我的消息", this.data.myMessages[index])
    if(app.globalData.openid == this.data.myMessages[index].userA_id) {
      wx.navigateTo({
        url: "/pages/chat/chat?id=" + this.data.myMessages[index].userB_id
      })
    }else {
      wx.navigateTo({
        url: "/pages/chat/chat?id=" + this.data.myMessages[index].userA_id
      })
    }
    
  },
  onShow: function () {
    this.getMessageList()
  }
})