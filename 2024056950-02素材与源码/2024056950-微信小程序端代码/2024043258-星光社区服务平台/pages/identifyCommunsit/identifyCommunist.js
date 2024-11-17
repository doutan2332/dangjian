// pages/identifyCommunsit/identifyCommunist.js
const app = getApp()
const Api = require('../../utils/request')
Page({
  data: {
    imgList: [],
    fileIDs: [],
    fileURLs: [],
    imgSrc: '',
    hiddenName: false
  },
  onLoad: function (options) {
    
  },

  onShow: function () {

  },
  // 上传证件照
  hidePlus() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success: res => {
        //上传图片
        const tempFilePaths = res.tempFilePaths[0]
        if (tempFilePaths != '') {
          this.setData({
            hiddenName: true
          })
        } else {
          this.setData({
            hiddenName: false
          })
        }
        this.setData({
          imgSrc: tempFilePaths
        })
      }
    })
  },

  //验证姓名
  isName(value) {
    if (!(/^[\u4E00-\u9FA5A-Za-z]+$/.test(value))) {
      return false;
    }
    return true;
  },

  //验证手机号
  isTel(value) {
    if (!/^1(3|4|5|7|8)\d{9}$/.test(value)) {
      return false
    }
    return true
  },
  //选择图片
  ChooseImage() {
    console.log("选择图片")
    wx.chooseImage({
      count: 4,
      sizeType: ['original', 'compressed'],
      sourceType: ['album'], //从相册中选择   
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    })
  },
  //预览图片
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    })
  },
  //删除图片
  DelImg(e) {
    wx.showModal({
      title: '删除图片',
      content: "确定要删除这张图片吗？",
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },

  //1.点击保存按钮 触发表单提交事件
  clickBtn(e) {
    this.reg(e);
  },
  //2.提交表单
  reg: function (e) {
    // 将用户状态更新为申请状态 0表示普通用户 1表示党员 2表示审核失败 -1表示审核中
    app.globalData.communistStatus = -1

    
    console.log("表单数据:", e.detail.value);

    // 0.验证表单内容是否合法
    var data = e.detail.value
    console.log(e)
    console.log(data)
    if (!this.isName(data.linkman)) {
      wx.showToast({
        title: '姓名有误',
        icon: 'error'
      })
      return;
    }
    if (!this.isTel(data.tel)) {
      wx.showToast({
        title: '联系电话有误',
        icon: 'error'
      })
      return;
    }
    console.log("data.occupation", data.occupation)
    if (!data.occupation) {
      wx.showToast({
        title: '请输入职业',
        icon: 'error'
      })
      return;
    }
    console.log("data.introduction", data.introduction)
    if (!data.introduction) {
      wx.showToast({
        title: '请输入职业',
        icon: 'error'
      })
      return;
    }
    if(!this.data.hiddenName) {
      wx.showToast({
        title: '请上传一寸照片',
        icon: 'error'
      })
      return;
    }
    //将一寸照片上传到云存储 并更新用户数据库
    wx.cloud.uploadFile({
      cloudPath: new Date().getTime() + "/communistPic.png",
      filePath: this.data.imgSrc,
      success: res => {
        console.log("上传证件照", res.fileID)
        this.setData({
          communistPic: res.fileID
        })
      }
    })

    let name = data.linkman;

    let telephone = data.tel;

    let occupation = data.occupation;

    let introduce = data.introduction;

    // 1.将图片上传到云存储
    let imgList = this.data.imgList;
    const promiseArr = []
    for (let i = 0; i < imgList.length; i++) {
      let filePath = imgList[i]
      let suffix = /\.[^\.]+$/.exec(filePath)[0]; //获取文件扩展名
      promiseArr.push(new Promise((reslove, reject) => {
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime() + suffix,
          filePath: filePath //小程序临时文件路径
        }).then(res => {
          this.setData({
            fileIDs: this.data.fileIDs.concat(res.fileID)
          })
          reslove()
        }).catch(error => {
          console.log("上传失败", error)
        })
      }))
    }

    //上传到党员认证数据库 后续审核党员信息 上传到后端
    Promise.all(promiseArr).then(res => {
      //!!!获取图片的http路径
      let fileList = this.data.fileIDs;
      let fileURL = [];
      wx.cloud.getTempFileURL({
        fileList: fileList,
        success: res => {
          for (let i = 0; i < res.fileList.length; i++) {
            fileURL = fileURL.concat(res.fileList[i].tempFileURL);
          }
          this.setData({
            fileURLs: fileURL
          })
          console.log("上传成功：", this.data.fileURLs);


          // 更新用户信息
          wx.cloud.database().collection("community_users").where({
            _openid: app.globalData.myopenid
          }).update({
            data: {
              realName: name,
              telephone: telephone,
              occupation: occupation,
              introduce: introduce,
              communistPic: this.data.communistPic
            }
          }).then(res => {
            console.log("用户信息更新成功")
          })

          //!!!!!!!将数据上传到后端
          let picURLS = this.data.fileURLs.join(',');
          let mydata = {
            picURLS: picURLS,
            realName: name,
            telephone: telephone,
            _openid: app.globalData.myopenid
          }
          console.log("上传到后端的数据", mydata);

          wx.navigateBack({
            delta: 0,
            success(res) {
              wx.showToast({
                title: '等待审核',
              })
            }
          })

          Api.http(
            {
              url: '/party/identify',
              data: mydata,
              method: 'POST'
            },
            (res) => {
              console.log(res)
            },
            (err) => {
              wx.showToast({
                title: '无法连接到后台',
                icon: 'none',     //微信小程序自带的失败弹窗
                duration: 2000
              })
            }
          )
        },
        fail: res => {
          console.log("上传失败")
        }
      });
    })
  }
})