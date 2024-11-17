// pages/post/post.js
const db = wx.cloud.database();
const app = getApp();
const util = require("../../utils/util")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}, //获取用户头像和昵称
    images: [], //上传的图片列表
    fileIDs: [],
    imgid: 0,
    remarks: '', //备注
    comments: [], //评论
    content: {}, //发表内容
    picker: ['老人', '小孩', '其他'], //服务类型
    index: null,
    date: '',
    time: ["7:30 - 9:30", "9:30 - 11:30", "11:30 - 12:30", "13:30 - 15:30", "15:30 - 17:30", "17:30 - 18:30", "19:30 - 21:30"],
    timeIndex: null,
    location: null //位置
  },

  //服务类别 起止时间 对象 特殊要求

  // 函数1：输入备注
  getInputValue(e) {
    this.setData({
      remarks: e.detail.value
    })
  },
  // 函数2：预览图片
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.images,
      current: e.currentTarget.dataset.url
    })
  },
  // 函数3：选择图片
  chooseImage() {
    wx.chooseImage({
      count: 9, //最大为9张照片
      sizeType: ['compressed', 'original'], //压缩图 原图
      sourceType: ['album'], //从相册中选择
      success: (res) => {
        //图片追加到原来的数组中
        if (this.data.images.length != 0) {
          this.setData({
            images: this.data.images.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            images: res.tempFilePaths
          })
        }
      }
    })
  },

  //函数4：发表
  post() {
    console.log("发表")
    if(this.data.index === null) {
      wx.showToast({
        title: '请选择服务类型',
        icon: 'error'
      })
      return;
    }
    if(this.data.timeIndex === null) {
      wx.showToast({
        title: '请选择服务时间',
        icon: 'error'
      })
      return;
    }
    let imgList = this.data.images
    wx.showLoading({
      title: '发布中...'
    })
    
    const promiseArr = []
    //只能一张张上传 遍历临时的图片数组
    for (let i = 0; i < imgList.length; i++) {
      let filePath = imgList[i]
      let suffix = /\.[^\.]+$/.exec(filePath)[0]; // 正则表达式，获取文件扩展名
      //在每次上传的时候，就往promiseArr里存一个promise，只有当所有的都返回结果时，才可以继续往下执行
      promiseArr.push(new Promise((reslove, reject) => {
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime() + suffix,
          filePath: filePath, // 文件路径
        }).then(res => {
          // get resource ID
          console.log("上传结果", res.fileID)
          this.setData({
            fileIDs: this.data.fileIDs.concat(res.fileID)
          })
          reslove()
        }).catch(error => {
          console.log("上传失败", error)
        })
      }))
    }

    //保证所有内容都上传成功
    Promise.all(promiseArr).then(res => {
      wx.cloud.database().collection('community_dynamics').add({
        data: {
          faceImg: this.data.userInfo.faceImg,
          nickName: this.data.userInfo.nickName,
          fileIDs: this.data.fileIDs, //上传的图片
          remarks: this.data.remarks, //特殊要求 备注
          date: this.data.date, //服务日期
          serviceTime: this.data.time[this.data.timeIndex],//服务时间
          serviceType: this.data.picker[this.data.index], //服务类型
          serviceLocation: this.data.location,//服务地址
          time: util.formatTime(new Date()),//发布时间
          address: this.data.userInfo.address//用户所在社区位置
        },
        success: res => {
          wx.hideLoading()
          wx.showToast({
            title: "发布成功"
          })
          console.log("发布成功", res)
          wx.switchTab({
            url: '../dynamic/dynamic',
          })
        },
        fail: err => {
          wx.hideLoading()
          wx.showToast({
            icon: 'none',
            title: '网络不给力'
          })
          console.error("发布失败", err)
        }
      })
    })
  },

  //函数5：退出时保存或取消
  saveEditOrNot() {
    var that = this;
    wx.showModal({
      title: '退出发布',
      content: '',
      cancelText: '取消',
      confirmText: '退出',
      success(res) {
        //保留
        if (res.confirm) {
          console.log("退出")
          that.setData({
            images: [], //上传的图片列表
            fileIDs: [],
            imgid: 0,
            remarks: '', //备注
            comments: [], //评论
            content: {}, //发表内容
          })
          wx.navigateBack({
            delta: 1,
          })
        }
      }
    })
  },

  //函数6：选择位置
  chooseLocation() {
    console.log("选择位置")
    let that = this;
    wx.chooseLocation({
      success(res) {
        that.setData({
          location: res.name
        })
      },
      fail(err) {
        console.log("获取位置失败, error")
      }
    })
  },

  //picker
  //1.DateChange
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  //2.TimeChange
  TimeChange(e) {
    this.setData({
      timeIndex: e.detail.value
    })
  },
  //3.PickerChange
  PickerChange(e) {
    this.setData({
      index: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    //获取今天的日期
    let date = new Date();
    let y = date.getFullYear().toString();
    let m = (date.getMonth() + 1).toString();
    let d = (date.getDate()).toString();
    if (parseInt(m) < 10) {
      m = "0" + m;
    }
    if (parseInt(d) < 10) {
      d = "0" + d;
    }
    let startDate = y + '-' + m + '-' + d;
    this.setData({
      date: startDate
    })
    //清空原有数据
    this.setData({
      images: [], //上传的图片列表
      fileIDs: [],
      remarks: ""
    })
    //获取当前用户信息
    this.setData({
      userInfo: app.globalData.userInfo
    })
    console.log("获取用户信息", app.globalData.userInfo)
  }
})