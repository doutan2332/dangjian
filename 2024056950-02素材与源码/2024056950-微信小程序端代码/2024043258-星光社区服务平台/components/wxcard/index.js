// components/wxcard/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      observer: function (newVal, oldVal) {
        // console.log(newVal)
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showBar: false,
    liked: false,
    //喜欢列表
    likeList: [],
    //评论列表
    commentList: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    openActionBar() {
      this.setData({
        showBar: true
      })
    },
  },
})
