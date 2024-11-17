// pages/login/login.js
const Api = require("../../utils/request")
const app = getApp()
Page({
  data: {
    position: null,//位置信息
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
  },
  onLoad: function (options) {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    //0.获取地址选择组件
    this.getAddress = this.selectComponent("#getAddress")
    wx.getSystemInfo({
      success: (result) => {
        this.setData({
          windowWidth: result.windowWidth,
          windowHeight: result.windowHeight
        })
      },
    })
    //1.读取党员信息
    this.getCommunity();
    //2.查询数据库是否存在用户信息 存在则直接登录
    this.directLogin()
  },
  sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  },
  //从后台数据库获取党员信息
  getCommunity() {
    let communityA = []
    Api.http(
      {
        url: '/party/information',
        method: 'GET',
      },
      (res) => {
        let data = res.data
        console.log("党员信息", res.data)
        // 将请求的党员数据添加到云开发的数据库中
        for (let i = 0; i < data.length; i++) {
          if (data[i].status != 0) //用户申请过党员审核
          {
            let tmp = data[i];
            console.log("tmp", tmp)

            wx.cloud.database().collection('community_auditing_communist')
              .where({
                openid: tmp.openid
              })
              .get({
                success(res) {
                  console.log("查询党员信息", res.data)

                  if (res.data.length == 0) //该审核的党员不存在
                  {
                    console.log("该党员不存在")
                    if (tmp.leisure != null) {
                      tmp.leisure = tmp.leisure.split(',');
                      tmp.leisure.pop()
                    }
                    communityA.push(tmp);
                    console.log("添加云开发中的党员:", communityA)
                  } else {
                    //更新党员信息
                    console.log("存在该党员")
                  }
                }
              })
          }
        }
        this.sleep(3000).then(() => {
          // 将审核的党员信息批量存储到数据库中
          if (communityA.length != 0) {
            wx.cloud.callFunction({
              name: "addCommunity",
              data: {
                indata: communityA
              },
              success: function (res) {
                console.log(res.result)
              },
              fail: console.error
            })
          }
        })
      },
      (err) => {
        console.log("获取党员信息失败")
      }
    )
  },
  //用户登录时查看数据库中是否存在用户信息 如果存在 则无需授权登录
  directLogin() {
    this.sleep(500).then(() => {
      console.log("......", app.globalData.myopenid)
      wx.cloud.database().collection('community_users')
        .where({
          _openid: app.globalData.myopenid
        }).get({
          success: res => {
            console.log(res.data)
            if (res.data.length > 0) {
              console.log("登录成功", res.data[0])
              // //将登录的用户信息设置到缓存
              // wx.setStorageSync('userInfo', res.data[0])
              // console.log("更新用户信息", wx.getStorageSync('userInfo'))
              app.globalData.userInfo = res.data[0]
              app.globalData.openid = res.data[0]._openid
              wx.showToast({
                title: '登录成功',
                success(res) {
                  wx.switchTab({
                    url: '/pages/index/index',
                  })
                }
              })
            }
          }
        })
    })
  },
  //授权 获取用户信息 将用户信息存储到数据库中
  getUserProfile(e) {
    wx.getUserProfile({
      desc: '授权', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(".......")
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        //0.用户已授权
        var that = this
        wx.cloud.database().collection('community_users')
          .where({
            _openid: app.globalData.myopenid
          })
          .get({
            success(res) {
              //用户不存在
              if (res.data.length == 0) {
                //将该用户存储在用户表中
                wx.cloud.database().collection('community_users')
                  .add({
                    data: {
                      faceImg: that.data.userInfo.avatarUrl, //头像
                      nickName: that.data.userInfo.nickName, //昵称
                      address: that.data.entirePos,//社区地址
                      community: that.data.position,
                      beFocus: [], //被谁关注
                      realName: '',
                      telephone: '',
                      occupation: '',
                      introduce: '无',
                      comunistPic: ''
                    },
                    success(res) {
                      wx.showToast({
                        title: '登录成功',
                      }),
                        //修改全局的userInfo, 注册成功后直接登录
                        wx.cloud.database().collection("community_users").doc(res._id)
                          .get({
                            success(res) {
                              // //将注册的用户信息设置到缓存
                              // wx.setStorageSync('userInfo', res.data)
                              app.globalData.userInfo = res.data
                              app.globalData.openid = res.data._openid
                              console.log("登录成功", app.globalData.userInfo)
                              //将用户信息传到后端
                              Api.http(
                                {
                                  url: '/person/register',
                                  method: 'POST',
                                  data: app.globalData.userInfo
                                },
                                (res) => {
                                  console.log(res)
                                },
                                (err) => {
                                  console.log(err)
                                }
                              )
                              wx.switchTab({
                                url: '/pages/index/index',
                              })
                            },
                            fail(res) {
                              console.log("登录失败", res.data)
                            }
                          })
                    }
                  })
              }else {
                app.globalData.userInfo = res.data[0]
                app.globalData.userInfo.address = that.data.entirePos
                console.log("更新的社区地址1", app.globalData.userInfo.address)
                app.globalData.userInfo.community = that.data.position
                console.log("更新的社区地址2", app.globalData.userInfo.community)
                wx.cloud.database().collection('community_users').where({
                  _openid: app.globalData.myopenid
                }).update({
                  data: {
                    address: that.data.entirePos,//社区地址
                    community: that.data.position,
                  }
                }).then(res => {
                  console.log("更新社区位置成功")
                  wx.showToast({
                    title: '登录成功',
                    success(res) {
                      wx.switchTab({
                        url: '/pages/index/index',
                      })
                    }
                  })
                }
                )
              }
            }
          })
      }
    })
  },

  //登录
  login() {
    this.getUserProfile();
  },

  //选择地址
  chooseAddress: function (e) {
    this.getAddress.showsGoodsDetail();
    this.setData({
      hiddenBtn: true
    })
  },
  resultEvent(e) {
    let tmp = e.detail.nameArr.join('')
    this.setData({
      position: e.detail.nameArr[4],
      entirePos: tmp,
      hiddenBtn: false
    })
  },
  closeEvent(e) {
    console.log("点击了关闭按钮")
    this.setData({
      hiddenBtn: false
    })
  }
})