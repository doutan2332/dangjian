// pages/partyAvaluate/detail/detail.js
const Api = require("../../../utils/request")
const app = getApp()
Page({
  data: {
    content: "",
    communist_id: ""
  },
  onLoad(options) {
    this.setData({
      communist_id: options.id
    })
  },
  //获取评价内容
  getInputValue(e) {
    this.setData({
      content: e.detail.value
    })
  },
  //发布
  post() {
    //将评价信息传到后端
    if(this.content == "") {
      wx.showToast({
        title: '请输入党员评价',
        icon: 'error'
      })
      return;
    }
    let tmp = {
      openid: app.globalData.myopenid,
      communistId: this.data.communist_id,
      content: this.data.content
    }
    console.log("党员评价", tmp)
    Api.http(
      {
        url: '/evaluation/add',
        data: tmp,
        method: 'POST'
      },
      (res) => {
        console.log("评价上传至成功", res)
        wx.showToast({
          title: '等待审核',
          duration: 1000,
          success: function () {
            setTimeout(function () {
              wx.navigateBack({
                delta: 1,
              })
            }, 1000)
          }
        })
      },
      (err) => {
        console.log("加载党员列表失败")
      }
    )

  },
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})