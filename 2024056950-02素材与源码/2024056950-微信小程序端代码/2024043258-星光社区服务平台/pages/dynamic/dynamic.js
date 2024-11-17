// pages/dynamic/dynamic.js
const DB = wx.cloud.database().collection("community_dynamics").orderBy('time', 'desc') //按发布时间排序
const app = getApp();
const db = wx.cloud.database()
let Total = -1; //动态总数

let love = false;
let praise = false;
let id = ''
Page({
  data: {
    // 动态列表
    momentsList: [
    ]
  },
  PList: [], //点赞关注列表
  /**
   * 生命周期函数--监听页面加载
   */
  //分页获取全部动态 
  getDynamicList() {
    let len = this.data.momentsList.length;
    if (Total == len && len != 0) {
      wx.showToast({
        title: '到底部啦~',
      })
      return;
    }
    wx.showLoading({
      title: '加载中',
    })
    DB.where({
      address: app.globalData.userInfo.address
    }).skip(len)
      .get({
        success: res => {
          this.setData({
            momentsList: this.data.momentsList.concat(res.data)
          })
          //隐藏正在加载中
          wx.hideLoading();
        },
        fail: res => {
          console.log("获取动态失败", res)
          //隐藏正在加载中提示
          wx.hideLoading();
          //提示用户加载失败
          wx.showToast({
            title: "加载失败"
          })
        }
      })
  },
  //图片预览
  previewImg: function (e) {
    let imgData = e.currentTarget.dataset.img;
    wx.previewImage({
      //当前显示图片
      current: imgData[0],
      //所有图片
      urls: imgData[1],
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //清空list
    this.data.momentsList = [];
    //1.获取动态总数
    DB.where({
      address: app.globalData.userInfo.address
    }).count().then(res => {
      console.log("获取动态", res)
      Total = res.total;
      console.log("动态总数", Total)
    })
    // 分页加载
    //2.从数据库中获取具体动态
    this.getDynamicList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getDynamicList();
  },
  //点击发布按钮
  setNews() {
    //判断用户是否登录 未登录则不能发布
    if (app.globalData.userInfo == null) {
      wx.showToast({
        title: '请登录',
        icon: 'error',
        duration:2000
      })
    } else {
      wx.navigateTo({
        url: '/pages/post/post',
      })
    }
  },

  //用户点击了头像 跳转到对应的个人主页
  toHomepage(e) {
    var index = e.currentTarget.dataset.index
    console.log("动态", this.data.momentsList[index])
    wx.navigateTo({
      url: '/pages/dynamic/homepage/homepage?id=' + this.data.momentsList[index]._openid,
    })
  }
})