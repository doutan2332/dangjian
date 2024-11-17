const app = getApp(); //获取应用实例
//获得util.js的函数,先模块化引用utils里面的js地址,reqiure('js地址')成一个面向对象
var util = require('../../utils/util.js');

Page({
  data: {
    VerticalNavTop: 0,
    TabCur: 0,
    MainCur: 0,
    list: [], //左边滚动栏显示的列表内容
    load: true,
    span0: [],//今天剩余的时间段
    span: ["7:30-9:30", "9:30-11:30", "11:30-12:30", "13:30-15:30", "15:30-17:30", "17:30-18:30", "19:30-21:30"],
    swiperList: ['../../icons/spwiper1.jpg', '../../icons/swiper2.jpg', '../../icons/swiper3.jpg'],
    activityTypes: ["老人", "小孩", "其它"], // 活动类型列表
    activityTypeIndex: 0, // 默认选中的活动类型索引
    selectedActivityType: "", // 用户选择的活动类型
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
    let list = [{}];
    for(let i = 0; i < 3; i++)
    {
      list[i] = {},
      list[i].name = this.formatDate(i == 0?date:this.addDate(date))
      list[i].id = i;
    }
    this.setData({
      list: list,
      listCur: list[0],//当前激活的item
      activityTypeIndex: 0, //默认选中的活动类型索引
      selectedActivityType: this.data.activityTypes[0] //默认选中的活动类型
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
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
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

  //活动类型选择器变化事件处理函数
onActivityTypeChange(event) {
  const { value } = event.detail; //获取用户选择的索引值
  this.setData({
    activityTypeIndex: value, //更新选择的活动类型索引
    selectedActivityType: this.data.activityTypes[value] //更新选择的活动类型
  });
},

  //进入预约详情页
  toAppointmentDetail(e) {
    let dateid = e.currentTarget.dataset.dateid;
    let timeid = e.currentTarget.dataset.timeid;
    let leisure = dateid + " " + timeid;
    let selectedActivityType = this.data.selectedActivityType;
    console.log("选择的时间段:", leisure);
    console.log("选择的活动类型", selectedActivityType);
    wx.navigateTo({
      url: '/pages/appointment/detail/detail?leisure=' + leisure +'&activityType=' + selectedActivityType,
    })
  }
})
