let app = getApp()
let storage = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dateStart: '',
    dateEnd: '',
    timeStart: '00:00',
    timeEnd: '00:00',
    create_time: '',
    end_time: '',
    selected: 0,
    list: [],
    p: { page: 1, pagesize: 10 },
    totalPage: '',
    canScroll: true,
    footTitle: '',
    noRes: ''
    
  },
  search: function () {
    this.setData({ canScroll: true, p: { page: 1, pagesize: 10 }, list: [], footTitle: '', noRes: '' })

    let [yyyyStart, mthStart, ddStart] = this.data.dateStart.split('-')
    let [hhStart, mmStart] = this.data.timeStart.split(':')
    let [yyyyEnd, mthEnd, ddEnd] = this.data.dateEnd.split('-')
    let [hhEnd, mmEnd] = this.data.timeEnd.split(':')
    let date_start = new Date(yyyyStart * 1, mthStart * 1 - 1, ddStart * 1, hhStart * 1, mmStart * 1, 0) * 1
    let date_end = new Date(yyyyEnd * 1, mthEnd * 1 - 1, ddEnd * 1, hhEnd * 1, mmEnd * 1, 0) * 1
    if (date_end * 1 < date_start) {
      wx.showToast({
        title: '结束时间不能小于开始时间',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (date_end - date_start > 3600 * 24 * 1000 * 30) {
      wx.showToast({
        title: '查询时间不得超过30天',
        icon: 'none',
        duration: 2000
      })
      return
    }
    let create_time = (date_start + "").substr(0, 10)
    let end_time = (date_end + "").substr(0, 10)
    this.setData({ create_time, end_time })


    if (this.data.selected === 0) {
      wx.showNavigationBarLoading()
      this.getX1Order(storage.get_s('userId'), this.data.p, create_time, end_time, (cbRes) => {
        if (cbRes.data.data.list.length === 0) {
          this.setData({ noRes: '暂无记录' })
        } else {
          if (cbRes.data.data.pagecount === 1) {
            this.setData({ canScroll: false, footTitle: '以上是全部吃饭记录' })
          }
          this.setData({ list: cbRes.data.data.list, totalPage: cbRes.data.data.pagecount })
        }
        wx.hideNavigationBarLoading()
      })
    }

    if (this.data.selected === 1) {
      wx.showNavigationBarLoading()
      this.getX2Order(storage.get_s('userId'), this.data.p, create_time, end_time, (cbRes) => {
        if (cbRes.data.errcode === 300) {
            wx.showToast({
            title: cbRes.data.errmsg,
            icon: 'none',
            duration: 2000,
            mask: true,
            success: () => {}
          })
        }

        if (cbRes.data.errcode === 0) {
          if (cbRes.data.data.list.length === 0) {
            this.setData({ noRes: '暂无记录' })
          } else {
            if (cbRes.data.data.pagecount === 1) {
              this.setData({ canScroll: false, footTitle: '以上是全部外卖记录' })
            }
            this.setData({ list: cbRes.data.data.list, count_price: cbRes.data.data.money, count: cbRes.data.data.count, totalPage: cbRes.data.data.pagecount })
          }
        }
        wx.hideNavigationBarLoading()
      })
    }

    if (this.data.selected === 2) {
      wx.showNavigationBarLoading()
      this.getInvoiceList(storage.get_s('userId'), this.data.p, create_time, end_time, (cbRes) => {
        if (cbRes.data.data.data.list.length === 0) {
          this.setData({ noRes: '暂无记录' })
        } else {
          if (cbRes.data.data.data.pagecount === 1) {
            this.setData({ canScroll: false, footTitle: '以上是全部开票记录' })
          }
          this.setData({ list: cbRes.data.data.data.list, totalPage: cbRes.data.data.data.pagecount })
        }
        wx.hideNavigationBarLoading()
      })
    }
  },
  bindDateStartChange: function (e) {
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


  getX1Order: function (userId, p, startTime, endTime, cb) {
    app.xhr('POST', '?controller=order&action=getX1Order', { userId, page: p.page, pagesize: p.pagesize, startTime, endTime }, '', (res) => {
      if (typeof (cb) === "function") {
        cb(res)
      }
    })
  },


  getX2Order: function (userId, p, startTime, endTime, cb) {
    app.xhr('POST', '?controller=order&action=getX2Order', { userId, page: p.page, pagesize: p.pagesize, startTime, endTime }, '', (res) => {
      if (typeof (cb) === "function") {
        cb(res)
      }
    })
  },


  getInvoiceList: function (user_id, p, create_time, end_time, cb) {
    app.xhr('POST', '?controller=invoice&action=getInvoiceList', { user_id, page: p.page, pagesize: p.pagesize, create_time, end_time }, '', (res) => {
      if (typeof (cb) === "function") {
        cb(res)
      }

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let end = new Date().format("yyyy-MM-dd")
    let start = new Date(new Date() * 1 - 3600 * 24 * 1000 * 30).format("yyyy-MM-dd");

    this.setData({ dateStart: start, dateEnd: end })
    this.setData({ selected: options.top_id * 1 })


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
    if (this.data.canScroll == true && this.data.totalPage > 1) {
      let page = this.data.p.page + 1
      this.setData({ canScroll: false, p: { page, pagesize: this.data.p.pagesize } })

      if (this.data.selected === 0 && this.data.totalPage >= page) {
        wx.showNavigationBarLoading()

        this.getX1Order(storage.get_s('userId'), this.data.p, this.data.create_time, this.data.end_time, (cbRes) => {
          let listPush = cbRes.data.data.list
          let list = [...this.data.list, ...listPush]
          this.setData({ list, canScroll: true })
          wx.hideNavigationBarLoading()
          if (this.data.totalPage === page) {
            this.setData({ canScroll: false, footTitle: '以上是全部吃饭记录' })
          }
        })
      }

      if (this.data.selected === 1 && this.data.totalPage >= page) {
        wx.showNavigationBarLoading()

        this.getX2Order(storage.get_s('userId'), this.data.p, this.data.create_time, this.data.end_time, (cbRes) => {
          let listPush = cbRes.data.data.list
          let list = [...this.data.list, ...listPush]
          this.setData({ list, canScroll: true })
          wx.hideNavigationBarLoading()
          if (this.data.totalPage === page) {
            this.setData({ canScroll: false, footTitle: '以上是全部外卖记录' })
          }
        })
      }


      if (this.data.selected === 2 && this.data.totalPage >= page) {
        wx.showNavigationBarLoading()

        this.getInvoiceList(storage.get_s('userId'), this.data.p, this.data.create_time, this.data.end_time, (cbRes) => {
          let listPush = cbRes.data.data.data.list
          let list = [...this.data.list, ...listPush]
          this.setData({ list, canScroll: true })
          wx.hideNavigationBarLoading()
          if (this.data.totalPage === page) {
            this.setData({ canScroll: false, footTitle: '以上是全部开票记录' })
          }
        })
      }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})