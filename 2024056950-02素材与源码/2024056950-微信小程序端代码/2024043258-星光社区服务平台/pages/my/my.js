// pages/my/my.js
const app = getApp();
const db = wx.cloud.database()
const Api = require("../../utils/request")
Page({
  data: {
    userInfo: {},
    position: null,
    hiddenBtn: false
  },
  onLoad: function (options) {
    console.log(app.globalData.userInfo)
    this.setData({
      userInfo: app.globalData.userInfo,
      position: app.globalData.userInfo.community
    })
    //2.获取地址选择组件
    this.getAddress = this.selectComponent("#getAddress")
    wx.getSystemInfo({
      success: (result) => {
        this.setData ({
          windowWidth: result.windowWidth,
          windowHeight: result.windowHeight
        })
      },
    })
  },
  //党员认证
  identify() {
    console.log("党员认证")
    if(this.data.position == null){
      wx.showToast({
        title: '请选择所在社区',
        icon: 'error'
      })
    }else {
      wx.navigateTo({
        url: '/pages/identifyCommunsit/identifyCommunist',
      })
    }
    
  },
  onShow: function () {
    console.log("onShow函数被触发了");
      var that = this
      that.setData({
        communistStatus: app.globalData.communistStatus//普通用户
      })
      //1.查看该用户是否是党员
      if (app.globalData.myopenid) {
        console.log("当前用户的 openid：", app.globalData.myopenid);
      } else {
        console.log("当前用户的 openid 为空或未定义");
      }      
      db.collection('community_auditing_communist')
      .where({
        openid: app.globalData.myopenid
      }).get({
        success(res) {
          console.log(res);
          let tmp = res.data;
          console.log(tmp);
          if(tmp.length != 0 ) {
            that.setData({
              communistStatus: tmp[0].status
            })
          }
          if(that.data.communistStatus == 2) {
            wx.showToast({
              title: '审核失败',
              icon: 'error'
            })
            //1.转变为普通用户
            app.globalData.communistStatus = 0;
            //2.将党员信息从云数据库和后端数据库中删除
            db.collection('community_auditing_communist').where({
              openid: app.globalData.myopenid
            }).remove().then(res => {
              console.log("删除成功")
            })
            Api.http(
              {
                url: '/party/delete',
                method: 'GET',
                data: app.globalData.myopenid
              },
              (res) => {
                console.log(res)
              },
              (err) => {
                console.log(err)
              }
            )

          }
        }
      })
  },


  //选择地址
  chooseAddress: function (e) {
    this.getAddress.showsGoodsDetail();
    this.setData({
      hiddenBtn: true
    })
  },
  resultEvent(e) {
    // console.log(e.detail.nameArr)
    let tmp = e.detail.nameArr.join('')
    this.setData({
      position: e.detail.nameArr[4],
      hiddenBtn: false
    })
    //更新用户的地址信息
    db.collection('community_users').where({
      _openid: app.globalData.userInfo._openid
    }).update({
      data: {
        community: this.data.position,
        address: tmp
      }
    }).then(res => {
      console.log("更新成功", res)
      app.globalData.userInfo.address = tmp;
      app.globalData.userInfo.community = this.data.position
    })
  },
  closeEvent(e) {
    console.log("点击了关闭按钮")
    this.setData({
      hiddenBtn: false
    })
  }
})