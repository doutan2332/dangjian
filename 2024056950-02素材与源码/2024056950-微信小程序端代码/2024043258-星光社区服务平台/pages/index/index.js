// index.js
// 获取应用实例
const app = getApp()
let list1 = []
let list2 = []
Page({
  data: {
    TabCur: 0, //新闻当前标签
    scrollLeft: 0,
    newsTab: ['党建', '民生'],
    swiperList: [],
    //type title content date 
    newsList: []
  },
  //sleep函数
  sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  },
  onLoad() {
         //获取新闻 轮播图数据
    this.setData({
      swiperList: 
      // app.globalData.swiperInfo 不知道为啥不能用
      [
        "../../icons/spwiperList1.jpg",
        "../../icons/swiper2.jpg",
        "../../icons/swiper3.jpg"
      ]

    })
    console.log(app.globalData.swiperInfo);
    console.log("swiperList:", this.data.swiperList)
    this.sleep(1000).then(() => {
      this.setData({
        newsList: app.globalData.newsList
      })
      console.log("新闻列表", this.data.newsList)

      let len = this.data.newsList.length;
      let datearr = []
      for (let i = 0; i < len; i++) {
        console.log(this.data.newsList[i].date)
        datearr.push(this.data.newsList[i].date.substr(0, 10))
        if (this.data.newsList[i].type == "党内新闻") {
          list1.push(this.data.newsList[i])
        } else {
          list2.push(this.data.newsList[i])
        }
      }
      let s1 = new Set(list1);
      let s2 = new Set(list2);
      list1 = Array.from(s1);
      list2 = Array.from(s2);
      this.setData({
        datearr: datearr,
        curNewsList: list1
      })
    })
  },
  //切换新闻分类标签
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
    if (this.data.TabCur == 0) {
      this.setData({
        curNewsList: list1
      })
    } else {
      this.setData({
        curNewsList: list2
      })
    }
  },
  //选取位置
  chooseLocation() {
    console.log("选取位置")
    let self = this
    wx.chooseLocation({
      success(res) {
        self.setData({
          location: res.name
        })
      }
    })
  },
  //获取新闻详情页
  goNewsDetail(e) {
    wx.navigateTo({
      url: './newsDetail/newsDetail?id=' + e.currentTarget.dataset.id,
    })
  }
})
