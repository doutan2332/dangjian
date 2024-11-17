// pages/appointment/detail/detail.js
const db = wx.cloud.database()
const app = getApp();
let leisure;
let activityType;
Page({
  data: {
    communistList: []
  },
  onLoad: function (options) {
    this.setData({
      myopenid: app.globalData.myopenid
    })

    console.log("进入详情页", options.leisure + " " + options.activityType);
    leisure = options.leisure;
    activityType = options.activityType;
  },
  onShow: function () {
    // console.log("onshow被调用！");
    // const _ = db.command
    // var that = this;
    // console.log("leisure", leisure)
    // db.collection("community_auditing_communist").where({
    //   leisure: _.in([leisure]),
    //   status: 1,//审核通过的党员
    //   address: app.globalData.userInfo.address
    // }).
    //   get({
    //     success(res) {
    //       console.log("该时间段空闲的党员", res.data)
    //       if (res.data.length != 0) {
    //         //1.取出所有空闲党员的openid
    //         let openids = res.data.map((item) => {
    //           return item.openid
    //         })
    //         let reg = openids.join('|')
    //         console.log("reg", reg)
    //         //2.使用正则对象匹配用户表中的_openid是否在openids中
    //         db.collection('community_users').where({
    //           _openid: db.RegExp({
    //             regexp: reg,
    //             options: 'i'//不区分大小写
    //           })
    //         }).get({
    //           success: res => {
    //             console.log("模糊匹配", res)
    //             that.setData({
    //               communistList: res.data
    //             })
    //           }
    //         })
    //       } else {
    //         wx.showToast({
    //           title: '没有空闲党员',
    //           icon: 'error',
    //           duration: 1000,
    //           success: function () {
    //             setTimeout(function () {
    //               wx.navigateBack({
    //                 delta: 1,
    //               })
    //             }, 1000)
    //           }
    //         })
    //       }
    //     }
    //   })
          // 根据空闲时间获取空闲党员列表 保存在communistList中
          var _this = this;
  console.log(1111);
    wx.request({
      //精确匹配
     url: 'http://127.0.0.1:9999/partyLeisure/recommendation',
      data:
        {time: leisure,
        actype: activityType},
     method: 'GET',
     dataType: 'json',
     success:(res) => {
       console.log(res.data);
       if(res.data.length != 0)
       {
          //1.取出所有空闲党员的openid
          let openids = res.data;
          console.log(openids);
          let communistList = []; 
          let completedQueries = 0; // 记录完成查询的数量
          for(let i = 0; i < openids.length; i++)
          {
            db.collection('community_users').where({
              _openid: openids[i]
            }).get({
              success: queryRes => {
                console.log(queryRes);
                // 将查询到的数据添加到 communistList 中
                // communistList.push(queryRes.data[0]);
                communistList[completedQueries++] = queryRes.data[0];
                // 检查是否所有查询都已完成
                if (completedQueries === openids.length) {
                  // 所有查询完成后更新数据
                  _this.setData({
                    communistList: communistList
                  });
                  console.log("查询结果", communistList);
                }}
            })
          }
            
       }
       else {
                wx.showToast({
                  title: '没有空闲党员',
                  icon: 'error',
                  duration: 1000,
                  success: function () 
                  {
                    setTimeout(function () {
                      wx.navigateBack({
                        delta: 1,
                      })
                    }, 1000)
                  }
                })
              }
     },
     fail: (res)=>
     {
       console.log(res);
     }
    },
     )
  },
  //跳转到党员个人主页
  toHomepage(e) {
    let index = e.currentTarget.dataset.index;
    console.log("进入党员个人主页", index);
    wx.navigateTo({
      url: "/pages/dynamic/homepage/homepage?id=" + this.data.communistList[index]._openid
    })
  },
  //跳转到查看党员空闲页面
  toAvaiable(e) {
    console.log("查看所有空闲")
    let index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/appointment/schedule/schedule?id=' + this.data.communistList[index]._openid,
    })
  }
})