// app.js
const Api = require("./utils/request")
App({
  globalData: {
    userInfo: null,
    myopenid: '',
    isLogin: 0, //用户是否登录
    communistStatus: 0, //党员状态 0表示普通用户
    swiperInfo: [],
    newsList: []
  },

  onLaunch() {
    // 云开发环境初始化
    wx.cloud.init({
      env: "poole-9g1bnizsadfbeb2f"
    })
    //获取用户openid
    wx.cloud.callFunction({
      name: "getOpenid",
      success: res => {
        this.globalData.myopenid = res.result.openid
        console.log("获取成功", this.globalData.myopenid)
      },
      fail: res => {
        console.log("获取失败", res.result)
      }
    })

    //加载首页轮播图数据
    wx.cloud.database().collection("community_swiperList").get({
      success: res => {
        this.globalData.swiperInfo = res.data;
        console.log("swiperInfo:" + this.globalData.swiperInfo)
      }
    })
    //加载首页新闻
    Api.http(
      {
        url: '/news/all',
        method: 'GET'
      },
      (res) => {
        console.log("获取新闻列表", res)
        this.globalData.newsList = res.data
      },
      (err) => {
        console.log("获取新闻列表失败")
        this.globalData.newsList = [];
      }
    )
  },
})
