// pages/dynamic/homepage/homepage.js
const app = getApp();
Page({
  data: {
    focusSrc: ''
  },
  //1.根据用户的Openid获取该用户的基本信息
  getUserInfo() {
    var that = this
    wx.cloud.database().collection("community_users").where({
      _openid: that.data.openid
    }).get({
      success(res) {
        console.log(res.data);
        that.setData({
          userInfo: res.data[0]
        })
        console.log("被谁关注", that.data.userInfo.beFocus)
        that.setData({
          focusNum: that.data.userInfo.beFocus.length
        })
        //查看是否被我关注 如果关注了 则显示关注激活图标 如果未关注 则显示未激活图标
        //被关注了
        if (that.data.userInfo.beFocus.includes(that.data.myopenid)) {
          that.setData({
            focusSrc: "../../../icons/focus-active.svg",
            focusText: "取消关注"
          })
        } else {//未被关注
          that.setData({
            focusSrc: "../../../icons/focus.svg",
            focusText: "关注"
          })
          console.log("我未关注")
        }
      },
      fail(res) {
        console.log("失败", res)
      }
    })
  },
  // 2.获取该用户发布的动态
  getUserDynamics() {
    var that = this;
    wx.cloud.database().collection("community_dynamics").where({
      _openid: that.data.openid
    }).get({
      success(res) {
        console.log("用户发布的动态:", res.data);
        that.setData({
          momentsList: res.data
        })
      }
    })
  },
  onLoad: function (options) {
    //获取我的openid
    this.setData({
      myopenid: app.globalData.myopenid
    })
    //我所点击用户的openid
    console.log(options.id)
    this.setData({
      openid: options.id
    })
  },
  onShow: function () {
    //获取用户信息
    this.getUserInfo()
    this.getUserDynamics()
  },
  //用户点击了私信 跳转到聊天页面
  toChat() {
    console.log("我要联系", this.data.userInfo)
    wx.navigateTo({
      url: '/pages/chat/chat?id=' + this.data.openid,
    })
  },
  focus() {
    if (this.data.focusSrc === "../../../icons/focus.svg") {
      this.setData({
        focusSrc: '../../../icons/focus-active.svg',
        focusNum: this.data.focusNum + 1,
        focusText: "取消关注"
      })
      console.log("关注")
      //未被关注 则更新数据库 添加此关注的用户
      if (this.data.userInfo.beFocus.indexOf(this.data.myopenid) == -1) {//此前未关注
        this.data.userInfo.beFocus.push(this.data.myopenid)
        wx.cloud.database().collection("community_users").where({
          _openid: this.data.openid
        }).update({
          data: {
            beFocus: this.data.userInfo.beFocus
          }
        }).then(res => {
          console.log("关注，数据库更新成功")
        })
      }
    } else {//取消关注
      this.setData({
        focusSrc: "../../../icons/focus.svg",
        focusNum: this.data.focusNum - 1,
        focusText: "关注"
      })
      //更新数据库 删除取消关注的用户
      let tmp = this.data.userInfo.beFocus
      tmp.splice(tmp.indexOf(this.data.myopenid), 1)
      console.log("tmp", tmp)
      wx.cloud.database().collection("community_users").where({
        _openid: this.data.openid
      }).update({
        data: {
          beFocus: tmp
        }
      }).then(res => {
        console.log("取消关注，数据库更新成功")
      })
    }
  }
})