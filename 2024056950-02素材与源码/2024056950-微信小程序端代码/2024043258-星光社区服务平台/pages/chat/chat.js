// pages/chat/chat.js
const util = require("../../utils/util")
const app = getApp()
var recordwatcher = null

Page({
  data: {
    InputBottom: 0,
    isChated: false,
    scrollTop: 0,//控制上滑距离
  },
  InputFocus(e) {
    console.log(e.detail)
    this.setData({
      InputBottom: e.detail.height
    })
  },
  InputBlur(e) {
    this.setData({
      InputBottom: 0
    })
  },

  //获取容器高度
  pageScrollToBottom: function () {
    var that = this;
    wx.createSelectorQuery().select('#page').boundingClientRect((rect) => {
      console.log("rect:", rect.height)
      if(rect.height > that.data.height - that.data.InputBottom)
      {
        wx.pageScrollTo({
          scrollTop: rect.height
        })
      }   
    }).exec()
  },


  //1.获取输入内容
  getInputValue(event) {
    this.pageScrollToBottom()
    console.log(event.detail.value)
    this.setData({
      inputValue: event.detail.value
    })
  },

  //2.发送消息
  sendMessage() {
    this.pageScrollToBottom()
    var that = this
    if(that.data.inputValue == "")
    {
      return;
    }
    //1.将发送的消息存储到数据库中
    //构造record记录
    let msg = {}
    msg.nickName = that.data.myInfo.nickName
    msg.faceImg = that.data.myInfo.faceImg
    msg.id = that.data.myInfo._openid
    msg.text = that.data.inputValue
    msg.time = util.formatTime(new Date())

    //1.两人聊过天 则更新聊天记录
    if (that.data.isChated) {
      var action = that.data.chatList
      console.log("action", action)
      action.push(msg)
      console.log("action", action)
      wx.cloud.database().collection('community_record').doc(that.data.recordid)
        .update({
          data: {
            record: action,
            time: msg.time
          }
        }).then(res => {
          this.pageScrollToBottom()
        })
    } else {
      //建立新连接
      let therecord = []
      therecord.push(msg)
      wx.cloud.database().collection('community_record').add({
        data: {
          userA_id: that.data.myInfo._openid,
          userA_nickName: that.data.myInfo.nickName,
          userA_faceImg: that.data.myInfo.faceImg,

          userB_id: that.data.userBInfo._openid,
          userB_nickName: that.data.userBInfo.nickName,
          userB_faceImg: that.data.userBInfo.faceImg,

          record: therecord, //聊天记录
          time: util.formatTime(new Date())
        },
        success(res) {
          console.log("建立新连接", res)
          that.setData({
            recordid: res._id,
            isChated: true,
            record: therecord
          })
        }
      })
    }

    //3.将输入框内容清空
    that.setData({
      inputValue: "",
    })
  },
  onLoad: function (options) {
    console.log(options.id)
    console.log(app.globalData.userInfo)
    this.setData({
      height: wx.getSystemInfoSync().windowHeight,
      width: wx.getSystemInfoSync().windowWidth
    })
    this.setData({
      userBid: options.id,
      myInfo: app.globalData.userInfo
    });
    var that = this
    //设置数据库监听器
    this.recordwatcher = wx.cloud.database().collection('community_record')
      .where(
        wx.cloud.database().command.or([
          {
            userA_id: that.data.myInfo._openid,
            userB_id: that.data.userBid
          },
          {
            userB_id: that.data.myInfo._openid,
            userA_id: that.data.userBid
          }
        ]))
      .watch({
        onChange: function (snapshot) {
          //打印变动的信息
          if (snapshot.docChanges.length != 0) {
            console.log("数据库监听成功")
            console.log(snapshot.docChanges[0].doc)
            that.setData({
              chatList: snapshot.docChanges[0].doc.record
            })
          }
          that.pageScrollToBottom()
        },
        onError: function (err) {
          console.error('数据库监听错误', err)
        }
      })
    var that = this;
    //1. 根据传过来的id获取用户B的信息
    wx.cloud.database().collection("community_users").where({
      _openid: that.data.userBid
    }).get({
      success(res) {
        that.setData({
          userBInfo: res.data[0]
        })
      }
    })

    //2. 判断两个人是否聊过天
    const _ = wx.cloud.database().command;
    wx.cloud.database().collection("community_record").where(
      _.or([
        {
          userA_id: that.data.myInfo._openid,
          userB_id: that.data.userBid
        },
        {
          userB_id: that.data.myInfo._openid,
          userA_id: that.data.userBid
        }
      ])).get({
        success(res) {
          //存在该聊天记录
          if (res.data.length > 0) {
            that.setData({
              isChated: true, //二人聊过天
              recordid: res.data[0]._id, //聊天记录id
              chatList: res.data[0].record //获取聊天记录
            })
            console.log("聊过天", that.data.isChated, "recordid", that.data.recordid)
          }
        }
      })
      that.pageScrollToBottom()
  }
})