let app = getApp()
let storage = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    selected: 2,
    display: 'none',
    width: '',
    height: '',
    phone: '',
    topList: [{ id: 0, name: "吃饭记录" }, { id: 1, name: "外卖记录" }, { id: 2, name: "开票记录" }],
    list: [],
    count: '',
    count_price: '',
    p: { page: 1, pagesize: 10 },
    totalPage: '',
    canScroll:true,
    footTitle:''
  },
  toSearch: function () {
    wx.navigateTo({
      url: `../search/search?top_id=${this.data.selected}`,
      success: () => {

      }
    })
  },
  validateMobile: function (mobile) {
    let validate = /^1[3|5|7|8]\d{9}$/;
    return validate.test(mobile);
  },
  phoneHandle: function (e) {
    this.setData({ phone: e.detail.value })
  },
  validate: function () {
    if (this.validateMobile(this.data.phone)) {
      console.log('ok')

    } else {
      if (this.data.phone === '') {
        wx.showToast({
          title: '请输入手机号码',
          icon: 'none',
          duration: 2000
        })
      } else {
        wx.showToast({
          title: '请输入正确的手机号码',
          icon: 'none',
          duration: 2000
        })
      }
    }
    // if (this.data.validateAction == true) {
    //   this.setData({ validateAction: false, startTime: new Date() })
    //   app.xhr('GET', `/clients/send_sms?mobile=${this.data.mobile}`, '', '', (res) => {
    //     if (res.data.data == 'success') {
    //       wx.showToast({
    //         title: '短信成功发送',
    //         icon: 'success',
    //         duration: 1200,
    //         mask: true,
    //         success: () => {
    //           this.setData({ timerId: setInterval(this.tick, 1000) })
    //         }
    //       })
    //     } else {
    //       wx.showToast({
    //         title: '此手机已经注册过',
    //         icon: 'loading',
    //         duration: 1200,
    //         mask: true,
    //         success: () => {
    //           setTimeout(() => {
    //             this.setData({ validateAction: true })
    //           }, 800)
    //         }
    //       })
    //     }
    //   })

    // }

  },
  clickTop: function (e) {
    this.setData({
      selected: e.currentTarget.dataset.id, canScroll: true,p: { page: 1, pagesize: 10 }, count: '', count_price: '', list: [], footTitle:''})
    if (e.currentTarget.dataset.id === 1) {
      this.setData({ display: 'block' })
    }


    if (e.currentTarget.dataset.id === 2){
      this.getInvoiceList(storage.get_s('userId'), this.data.p)
  }


  },
  close: function () {
    this.setData({ display: 'none' })
  },
  touchWindow: function () {
    this.setData({ display: 'block' })
  },

  submit: function () {
    console.log(22)
  },
  lower: function () {
    console.log(34556)

  },

  getInvoiceList: function (user_id, p) {
    app.xhr('POST', '?controller=invoice&action=getInvoiceList', { user_id, page: p.page, pagesize: p.pagesize }, '', (res) => {
      this.setData({ list: res.data.data.data.list, count_price: res.data.data.data.count_price, count: res.data.data.data.count, totalPage: res.data.data.data.pagecount })
    })
  },

  login: function () {
    wx.login({
      success: (res) => {
        app.xhr('POST', '?controller=consumer&action=codeGetUserIofo', { wx_appid: 'wx3d7c7e70e4850853', code: res.code }, '', (res) => {
          if (res.data.errcode === 1) {
            wx.getUserInfo({
              success: (res1) => {
                app.xhr('POST', '?controller=consumer&action=wxUserInfoGetOursInfo', { wx_appid: 'wx3d7c7e70e4850853', session_token: res.data.data.session_token, vi: res1.iv, encrypte_data: res1.encryptedData }, '', (res2) => {
                  storage.set('userId', res2.data.data.user_id)
                  this.getInvoiceList(storage.get_s('userId'), this.data.p)
                })
              }
            })
          }
          if (res.data.errcode === 0) {
            storage.set('userId', res.data.data.user_id)
            this.getInvoiceList(storage.get_s('userId'), this.data.p)
          }
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var res = wx.getSystemInfoSync()
    this.setData({ width: res.windowWidth, height: res.windowHeight, left: res.windowWidth / 2 - res.windowWidth * 0.8 / 2, top: res.windowHeight / 2 - 105 })


    if (storage.get_s('userId')) {
      this.getInvoiceList(storage.get_s('userId'), this.data.p)
    } else {
      this.login()
      wx.getSetting({
        success:(res)=> {
          if (!res.authSetting['scope.userInfo']) {
            wx.authorize({
              scope: 'scope.userInfo',
              success: () => { },
              fail: () => {
                wx.openSetting({
                  success: (res) => {
                    this.login()
                  }
                })
              }
            })
          }
        }
      })
    }

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