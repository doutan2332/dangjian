// pages/appointment/schedule/schedule.js
const db = wx.cloud.database()
const app = getApp();
const Api = require("../../../utils/request")
let list0 = [];//今天的空闲时间段
let list1 = [];//明天的空闲时间段
let list2 = [];//后天的空闲时间段
let busyList = [];//党员与居民达成共识的时间段
let id;
Page({
  data: {
    openid: "",
    name: "",
    avatar: "",//照片
    communistPic: "",//一寸照
    occupation: "",//职业
    introduce: "",//简介
    leisure: [],
    thisDate: 0,//当前日期
    nowDate: 0,
    curleisure: [],//当前应该显示的空闲时间段
    isOrNot: [],
    commentList: [], //评价列表
    broadcast_arr: {
      speed: 2.8, //滚动速度，每秒2.8个字
      font_size: "16", //字体大小(px)
      text_color: "#8B7D7B", //字体颜色
      back_color: "#ffffff", //背景色
    }
  },
  //实现滚动效果
  textScroll() {
    let ititdata = this.data.commentList,
      assist = this.data.broadcast_arr,
      this_width = 0,
      spacing = 0,
      speed = (this.data.broadcast_arr.speed * this.data.broadcast_arr.font_size); //m每秒行走的距离
    for (let i in ititdata) {
      ititdata[i].starspos = wx.getSystemInfoSync().windowWidth; //以取屏幕宽度为间距
      this_width += ititdata[i].content.length * this.data.broadcast_arr.font_size;
      if (i != ititdata.length - 1) {
        spacing += ititdata[i].starspos
      }
    }
    let total_length = this_width + spacing;//总长
    assist.time = total_length / speed; /**滚动时间*/
    assist.width_mal = total_length;
    this.setData({
      broadcast_arr: assist,
      commentList: ititdata
    })
  },
  //获取党员评价
  getCommunityComments() {
    //获取党员评价
    let address = app.globalData.userInfo.address;
    console.log("获取党员评价", address)
    let that = this;
    Api.http(
      {
        url: '/evaluation/getEvaluations?_openid=' + app.globalData.userInfo._openid + '&communist_id=' + that.data.openid,
        method: 'GET'
      },
      (res) => {
        console.log("获取党员评价成功", res.data)
        //  let comments = [];
        //  res.data.forEach((item) => {
        //    comments.push(item.content)
        //  })

        that.setData({
          commentList: res.data
        })
        that.textScroll()
      },
      (err) => {
        console.log("获取党员评价失败", err)
      }
    )
  },
  onLoad: function (options) {

    //获取日期
    this.getWeekDay();
    id = options.id;
    this.setData({
      openid: id
    })
    //通过党员的openid获取该党员信息 包括照片、姓名、职业、介绍
    var that = this;
    db.collection("community_users").where({
      _openid: id
    }).get({
      success(res) {
        let info = res.data[0]
        that.setData({
          name: info.realName,
          avatar: info.faceImg,
          communistPic: info.communistPic,
          occupation: info.occupation,//职业
          introduce: info.introduce,//简介
        })
        //获取党员评价内容
        that.getCommunityComments()
      }
    })
  },
  //号数、月数补0
  paddingZero: function (n) {
    if (n < 10) {
      return '0' + n;
    } else {
      return n;
    }
  },
  getWeekDay() {
    console.log("getWeekDay")
    let that = this;
    let date = new Date();
    let year = date.getFullYear();//年
    let month = date.getMonth() + 1;//月
    let day = date.getDay();//日
    let week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    let dateTemp;
    let timeArr = [];
    let times;
    for (let i = 0; i < 3; i++) {
      // times = that.paddingZero((date.getMonth() + 1)) + "-" + that.paddingZero(date.getDate()); //格式化日期
      times = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
      dateTemp = date.getDate();
      // console.log("dateTemp", dateTemp)
      timeArr.push({
        'week': week[date.getDay()],//周几
        'day': dateTemp, //日
        'time': times //格式化日期
      })
      date.setDate(date.getDate() + 1);
    }
    that.setData({
      dateArray: timeArr,
      thisDate: timeArr[0].day, //日
      nowDate: timeArr[0].time //日期
    })
  },
  //日期选择
  dateClick(options) {
    let _this = this;
    let dateId = options.currentTarget.dataset.id;
    let times = options.currentTarget.dataset.time;
    _this.setData({
      thisDate: dateId,
      nowDate: times
    })
    if (times == _this.data.dateArray[0].time) {
      _this.setData({
        curleisure: list0
      })
      console.log("list0", list0)
    } else if (times == _this.data.dateArray[1].time) {
      _this.setData({
        curleisure: list1
      })
      console.log("list1", list1)
    } else if (times == _this.data.dateArray[2].time) {
      _this.setData({
        curleisure: list2
      })
      console.log("list2", list2)
    }
  },
  //进入预约页面
  toReserve(e) {
    let target = e.currentTarget.dataset.target
    console.log("预约时段", target)
    wx.navigateTo({
      url: '/pages/appointment/identify/identify?id=' + this.data.openid + '&time=' + target,
    })
  },
  onReady: function () {

  },
  //页面显示
  onShow: function () {

    list0 = [];
    list1 = [];
    list2 = [];
    let that = this;
    //0.获取党员近三天的空闲时间
    db.collection("community_auditing_communist").where({
      _openid: id
    }).get({
      success(res) {
        let len = res.data.length;
        let info = res.data[len - 1];
        console.log(info);
        console.log("获取党员近三天的空闲时间", info)
        that.setData({
          leisure: info.leisure
        })
        console.log("空闲时间", that.data.leisure)
        //1.将获取的空闲时间根据日期匹配到不同的数组中
        for (let i = 0; i < that.data.leisure.length; i++) {
          let tmp = that.data.leisure[i]
          if (tmp.indexOf(that.data.dateArray[0].time) != -1) {
            // list0.push(tmp);
            list0.push({
              time: tmp,
              status: 1 //1表示空闲 0表示忙碌
            })
          } else if (tmp.indexOf(that.data.dateArray[1].time) != -1) {
            // list1.push(tmp);
            list1.push({
              time: tmp,
              status: 1
            })
          } else if (tmp.indexOf(that.data.dateArray[2].time) != -1) {
            // list2.push(tmp);
            list2.push({
              time: tmp,
              status: 1
            })
          }
        }
        that.setData({
          curleisure: list0
        })
        //2.获取党员忙碌的空闲时间段
        busyList = []
        db.collection('community_resident_appointment').where({
          community_id: that.data.openid
        }).get({
          success(res) {
            if (res.data.length != 0)//存在该党员的预约信息
            {
              busyList = res.data.map(x => { return x.date_time }) // 生成数组

              console.log("忙碌时间段", busyList)
              //将党员忙碌的空闲时间段的状态修改为0
              for (let i = 0; i < list0.length; i++) {
                if (busyList.indexOf(list0[i].time) != -1) {
                  list0[i].status = 0;//修改为非空闲时间段
                }
              }
              for (let i = 0; i < list1.length; i++) {
                if (busyList.indexOf(list1[i].time) != -1) {
                  list1[i].status = 0;
                }
              }
              for (let i = 0; i < list2.length; i++) {
                if (busyList.indexOf(list2[i].time) != -1) {
                  list2[i].status = 0;
                }
              }
              that.setData({
                curleisure: list0
              })
            }
          }
        })
      }
    })
  }
})