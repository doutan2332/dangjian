const WXAPI = require('apifm-wxapi')
WXAPI.init('gooking')

Component({
  data: {
    // 弹窗显示控制
    isShowToast: true,
    isShowToasts: false,
    isClick: true,
    nameArr: ['', '', '', '', ''],
    currentTab: 0, // tab切换 
    provinces: [],// 省份数据数组
    pIndex: 0,//选择的省下标
    cities: [],// 城市数据数组
    cIndex: 0,//选择的市下标
    areas: [],// 区县数数组
    aIndex: 0,//选择的区下标
    streets: [],// 街道/镇数据数组
    sIndex: 0,// 选择的街道下标
    communities: [],//社区数组
    ccIndex: 0,//选择的社区下标
  },
  /**
   * 组件的方法列表
   */
  pageLifetimes: {
    show: function () {
      WXAPI.province().then(res => {
        if (res.code == 0) {
          this.setData({
            provinces: res.data
          })
        }
      }).catch(err => {
        console.log("获取省份失败", err)
      })
    }
  },
  methods: {
    //隐藏
    hideGoodsDetail: function () {
      var that = this
      that.setData({
        isShowToast: true
      })
      that.triggerEvent('closeEvent')
    },

    //显示
    showsGoodsDetail: function () {
      this.setData({
        nameArr: [],
        currentTab: 0
      })
      console.log("显示所属区域",this.data.nameArr)
      console.log("======", this.data.provinces)
      var that = this
      that.setData({
        isShowToast: false
      })
    },
    //改变省
    provinceChange: function (e) {
      const index = e.currentTarget.dataset.index
      var str = "nameArr[" + 0 + "]"//重点在这里，组合出一个字符串
      // this.data.nameArr.push(e.currentTarget.dataset.province)
      this.setData({
        pIndex: index,
        [str]: e.currentTarget.dataset.province
      })
      const pid = this.data.provinces[index].id
      WXAPI.nextRegion(pid).then(res => {
        if (res.code == 0) {
          this.setData({
            cities: res.data,
            currentTab: 1
          })
        }
      })
    },

    //改变市
    cityChange: function (e) {
      const index = e.currentTarget.dataset.index
      var str = "nameArr[" + 1 + "]"//重点在这里，组合出一个字符串
      // this.data.nameArr.push(e.currentTarget.dataset.city)
      this.setData({
        cIndex: index,
        [str]: e.currentTarget.dataset.city
      })
      const pid = this.data.cities[index].id
      WXAPI.nextRegion(pid).then(res => {
        console.log(res)
        if (res.code == 0) {
          this.setData({
            areas: res.data,
            currentTab: 2
          })
        }
      })
    },
    //改变区
    areaChange(e) {
      const index = e.currentTarget.dataset.index
      // this.data.nameArr.push(e.currentTarget.dataset.area)
      var str = "nameArr[" + 2 + "]"//重点在这里，组合出一个字符串
      this.setData({
        aIndex: index,
        [str]: e.currentTarget.dataset.area
      })
      const pid = this.data.areas[index].id
      WXAPI.nextRegion(pid).then(res => {
        console.log(res)
        if (res.code == 0) {
          this.setData({
            streets: res.data,
            currentTab: 3
          })
        }
      })
    },
    //改变街道
    streetChange(e) {
      const index = e.currentTarget.dataset.index
      // this.data.nameArr.push(e.currentTarget.dataset.street)
      var str = "nameArr[" + 3 + "]"//重点在这里，组合出一个字符串

      this.setData({
        sIndex: index,
        [str]: e.currentTarget.dataset.street
      })
      const pid = this.data.streets[index].id
      WXAPI.nextRegion(pid).then(res => {
        console.log(res)
        if (res.code == 0) {
          this.setData({
            communities: res.data,
            currentTab: 4
          })
        }
      })
    },
    //改变社区
    communityChange(e) {
      const index = e.detail.value
      var str = "nameArr[" + 4 + "]"
      this.setData({
        ccIndex: index,
        isShowToast: true,
        [str]: e.currentTarget.dataset.community,
        currentTab: 0
      })
      //关闭并返回
      this.triggerEvent('resultEvent', {
        nameArr: this.properties.nameArr
      })
    },
    // 截获竖向滑动  
    catchTouchMove: function (res) {
      return false
    },

    // 点击tab切换  
    navbarTap: function (e) {
      var that = this

      that.setData({
        currentTab: e.currentTarget.dataset.index,
      })
      console.log(e.currentTarget.dataset.index)
    },
  },
})