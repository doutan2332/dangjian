
// pages/appointment/search/search.js
const db = wx.cloud.database()
const Api = require('../../../utils/request')
const app = getApp()
Page({
  data: {
    inputVal: "",
    communistList: []
  },
  inputTyping(e) {
    let community = e.detail.value
    console.log("搜索党员", community)
    var that = this
    //1.根据姓名查询该用户是不是党员
    let isCommunity = 0;
    Api.http(
      {
        url: '/party/one/' + community,
        method: 'GET'
      },
      (res) => {
        console.log("是否是党员", res.data)
        isCommunity = res.data
        if(isCommunity) {
          console.log("是党员")
          db.collection('community_users').where({
            realName: db.RegExp({
              regexp: community,
              options:'i'//不区分大小写
            }),
            address: app.globalData.userInfo.address
          }).get({
            success: res => {
              if(res.data.length == 0)
              {
                wx.showToast({
                  title: '未查询到该党员',
                  icon: 'error'
                })
              }else{
                console.log("查询到该党员")
                that.setData({
                  communistList: res.data
                })
              }
            }
          })
        }
      }
    )
    //2.若是党员 则模糊查询数据数据库 显示该党员信息
    // if(!isCommunity){
    //   wx.showToast({
    //     title: '未查询到该党员',
    //     icon: 'error'
    //   })
    //   // return;
    // }
    
  },
  //跳转到查看党员空闲页面
  toAvaiable(e) {
    let index = e.currentTarget.dataset.index;
    console.log(index);
    console.log(this.data.communistList[index]._openid);
    wx.navigateTo({
      url: '/pages/appointment/schedule/schedule?id=' + this.data.communistList[index]._openid,
    })
  },
  onLoad: function (options) {

  },

  onReady: function () {

  },

  onShow: function () {

  },

  onHide: function () {

  },

 
})