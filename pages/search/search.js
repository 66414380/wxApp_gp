let app = getApp()
let storage = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dateStart:'',
    dateEnd: '',
    timeStart:'00:00',
    timeEnd: '00:00',
    selected: 0,
    list: [],
    p: { page: 1, pagesize: 10 },
    totalPage: '',
    canScroll: true,
    footTitle: ''
  },
  search:function(){
    this.setData({ canScroll: true, p: { page: 1, pagesize: 10 }, list: [], footTitle: ''})
    // let start = new Date(this.data.dateStart) * 1
    // let end = new Date(this.data.dateEnd) * 1

    let date_start = `${this.data.dateStart} ${this.data.timeStart}`
    let date_end = `${this.data.dateEnd} ${this.data.timeEnd}`
    if (new Date(date_end) * 1 < new Date(date_start) * 1 ) {
      wx.showToast({
        title: '结束时间不得大于开始时间',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (new Date(date_end) * 1 - new Date(date_start) * 1 > 3600 * 24 * 1000 * 30  ){
      wx.showToast({
        title: '查询时间不得超过30天',
        icon: 'none',
        duration: 2000
      })
      return
    }
    console.log('ok')
    if (this.data.selected === 2){
      this.getInvoiceList(storage.get_s('userId'), this.data.p)
    }
  },
  bindDateStartChange:function(e){
    this.setData({
      dateStart: e.detail.value
    })
  },
  bindDateEndChange: function (e) {
    this.setData({
      dateEnd: e.detail.value
    })
  },
  bindTimeStartChange: function (e) {
    this.setData({
      timeStart: e.detail.value
    })
  },
  bindTimeEndChange: function (e) {
    this.setData({
      timeEnd: e.detail.value
    })
  }, 
  getInvoiceList: function (user_id, p) {
    app.xhr('POST', '?controller=invoice&action=getInvoiceList', { user_id, page: p.page, pagesize: p.pagesize }, '', (res) => {
      this.setData({ list: res.data.data.data.list, count_price: res.data.data.data.count_price, count: res.data.data.data.count, totalPage: res.data.data.data.pagecount })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let end = new Date().format("yyyy-MM-dd")
    let start = new Date(new Date() * 1 - 3600 * 24 * 1000 * 30).format("yyyy-MM-dd");

    this.setData({ dateStart: start, dateEnd: end})
    this.setData({ selected: options.top_id * 1})


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.canScroll == true) {
      this.setData({ canScroll: false })

      let page = this.data.p.page + 1

      if (this.data.selected === 2 && this.data.totalPage >= page) {
        wx.showNavigationBarLoading()
        app.xhr('POST', '?controller=invoice&action=getInvoiceList', { user_id: storage.get_s('userId'), page, pagesize: this.data.p.pagesize }, '', (res) => {
          let listPush = res.data.data.data.list
          let list = [...this.data.list, ...listPush]
          this.setData({ list, canScroll: true, p: { page, pagesize: this.data.p.pagesize } })
          wx.hideNavigationBarLoading()
        })

        if (this.data.totalPage === page) {
          this.setData({ canScroll: false, footTitle: '以上是全部开票记录' })
        }
      }

    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})