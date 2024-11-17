// pages/schedule/schedule.js
const Api = require("../../utils/request")
const app = getApp();
let curLeisure = [];
let checkList = [];
Page({
  data: {
    str:["abcd", "ad", "B"],
    str_:'B',

    TabCur: 0,
    MainCur: 0,
    checkList: [],
    list: [],//日期
    load: true,
    span0: ["15:30-17:30", "17:30-18:30", "19:30-21:30"], //今天剩余的时间段
    span: ["7:30-9:30", "9:30-11:30", "11:30-12:30", "13:30-15:30", "15:30-17:30", "17:30-18:30", "19:30-21:30"], //时间段
    activityTypes: ["全能", "小孩", "老人"], // 活动类型列表
    activityTypeIndex: 0, // 默认选中的活动类型索引
    selectedActivityType: "全能", // 党员选择的活动类型
  },
  //日期处理函数1：以.分割年月日
  formatDate(date) {
    let year = date.getFullYear();//年
    let month = date.getMonth() + 1;//月
    let day = date.getDate();//日
    let week = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
    return year + '/' + month + '/' + day + "(" + week[date.getDay()] + ")"
  },
  //日期处理函数2：将月份中的某一天设置为日期对象
  addDate(date) {
    date.setDate(date.getDate() + 1)
    return date;
  },
  //标记今天当前的空闲时间
  displayCurSpan(h, m) {
    let span = ["7:30-9:30", "9:30-11:30", "11:30-12:30", "13:30-15:30", "15:30-17:30", "17:30-18:30", "19:30-21:30"]
    if (h >= 0 && h < 7) {
      return span;
    }
    if (h >= 7 && h < 9) {
      console.log(span);
    } else if (h >= 9 && h < 11) {
      span = span.slice(1);
    } else if (h >= 11 && h < 13) {
      span = span.slice(2);
    } else if (h >= 13 && h < 15) {
      span = span.slice(3)
    } else if (h >= 15 && h < 17) {
      span = span.slice(4)
    } else if (h >= 17 && h < 19) {
      span = span.slice(5)
    } else if(h >= 19 && h < 21){
      span = span.slice(6)
    } else{
      return [];
    }
    if (m >= 30 || h % 2 == 0) {
      span = span.slice(1)
    }
    return span;
  },
  onLoad: function (options) {
    let date = new Date()
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    let list = [{}]
    for (let i = 0; i < 3; i++) {
      list[i] = {},
      list[i].name = this.formatDate(i == 0 ? date : this.addDate(date))
      list[i].id = i;
    }
    this.setData({
      list: list,
      listCur: list[0] //当前激活的日期
    }),
    //获取党员的空闲时间
    this.getLeisure();
  },
  //获取党员的空闲时间
  getLeisure() {
    wx.cloud.database().collection("community_auditing_communist")
    .where({
      openid: app.globalData.myopenid
    }).get({
      success: res => {
        const len = res.length;
        curLeisure = res.data[len - 1].leisure
        console.log(curLeisure);
        //标记党员的空闲时间 多选框变为选中与不可选状态
        this.setData({
          checkList: curLeisure
        })
        console.log("获取党员的空闲时间", this.data.checkList)
      }
    })
  },

  onReady() {
    wx.hideLoading()
  },
  onShow: function () {
    //标记今天未经历的时间段
    let date = new Date();//当前时间
    let hour = date.getHours();
    let minutes = date.getMinutes();
    this.setData({
      span0: this.displayCurSpan(hour, minutes)
    })
    console.log("span0", this.data.span0)
  },
  //列表item被点击
  tabSelect(e) {
    let index = e.currentTarget.dataset.id;
    this.setData({
      TabCur: index,
      MainCur: index,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 40
    })
  },
  //滚动右边内容
  VerticalMain(e) {
    let that = this;
    let list = this.data.list;
    let tabHeight = 0;
    if(this.data.load) {
      for(let i = 0; i < list.length; i++)
      {
        let view = wx.createSelectorQuery().select("#main-" + list[i].id);
        view.fields({
          size: true
        }, data => {
          list[i].top = tabHeight;
          tabHeight = tabHeight + data.height;
          list[i].bottom = tabHeight;
        }).exec();
      }
      that.setData({
        load: false,
        list: list
      })
    }
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop: (list[i].id - 1) * 40,
          TabCur: list[i].id
        })
        return false
      }
    }
  },
  //选择活动类型
  onActivityTypeChange(e) {
    const index = e.detail.value; // 获取党员选择的索引
    const selectedType = this.data.activityTypes[index]; // 根据索引获取选择的活动类型
    console.log("用户选择的活动类型：", selectedType);

    // 更新页面数据
    this.setData({
      activityTypeIndex: index,
      selectedActivityType: selectedType,
    });
  },
  //选择时间段
  handleItemChange(e) {
    checkList = e.detail.value;
    console.log("复选框:", checkList)
  },
  //将数据提交给后端
  submit() {
    let _this = this;
    console.log("选择的时间列表：",checkList);
    console.log("选择的活动类型：" + this.data.selectedActivityType);
    let curLeisure = [];
    for(let i = 0; i < checkList.length; i++)
    {
      curLeisure.push(checkList[i]);
    }
    let set = new Set(curLeisure);
    let submit = [...set];
    let tmp = submit.join(',');
    console.log(typeof submit);
    console.log("提交给后端的时间列表:", submit);
    

    // 将党员勾选的空闲时间段提交到后端 同时更新云数据库中党员的空闲时间
    let myData = {
        leisure: tmp,
        actype: _this.data.selectedActivityType,//获取选择的活动类型
        _openid: app.globalData.myopenid
    }
    // wx.cloud.database().collection("community_auditing_communist")
    // .where({
    //   openid: app.globalData.myopenid
    // }).update({
    //   data: {
    //     leisure: submit
    //   }
    // }).then(res => {
    //   console.log("党员空闲时间更新成功!")
    // })
  //   wx.cloud.database().collection("community_auditing_communist")
  // .where({
  //   openid: app.globalData.myopenid
  // })
  // .get()
  // .then(res => {
  //   // 确保查询到了文档
  //   if (res.data.length > 0) {
  //     // console.log(res.data[0]);
  //     // var first = wx.cloud.database().collection("community_auditing_communist")
  //     // .doc(res.data[0]._id);
  //     // console.log(first);
  //     // 更新第一个文档
  //     wx.cloud.database().collection("community_auditing_communist")
  //       .doc(res.data[0]._id) // 使用文档的 _id 来定位文档
  //       .update(
  //         {
  //           data:
  //           {
  //             leisure: submit
  //           }
  //         }
  //       )
  //       .then(updateRes => {
  //         console.log("党员空闲时间更新成功!");
  //       })
  //   }
  // });

  
  wx.cloud.database().collection("community_auditing_communist").add({
    data: {
      _id: null, // 如果不指定 _id 字段，系统会自动生成一个唯一的文档 ID
      address: app.globalData.userInfo.address,
      leisure: submit, // 初始时可以是 null 或其他合适的默认值
      actype: _this.data.selectedActivityType,//活动类型
      openid: app.globalData.myopenid, // 使用全局数据中的 openid
      status: 1 // 初始状态，可以根据需要设置为其他值
    },
    success: function(res) {
      console.log("添加记录成功", res);
    },
    fail: function(err) {
      console.error("添加记录失败", err);
    }
  });
    Api.http(
      {
        url: '/partyLeisure/save',
        method: 'POST',
        data: myData
      },
      (res) => {
        console.log(res)
        wx.showToast({
          title: '日程登记成功',
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
        console.log("提交空闲时间失败")
        wx.showToast({
          title: '无法连接到后台',
          icon: 'none',     //微信小程序自带的失败弹窗
          duration: 2000
        })
      }
    )
  }
})