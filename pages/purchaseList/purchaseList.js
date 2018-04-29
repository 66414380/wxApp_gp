let app = getApp()
let storage = require('../../utils/util.js')
let animation = wx.createAnimation({
  duration: 250,
  timingFunction: 'ease-in-out',
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canClickTop: true,
    selected: 0,
    display: 'none',
    width: '',
    height: '',
    phone: '',
    code: '',
    topList: [{ id: 0, name: "吃饭记录" }, { id: 1, name: "外卖记录" }, { id: 2, name: "开票记录" }],
    list: [],
    count: '',
    count_price: '',
    p: { page: 1, pagesize: 10 },
    totalPage: '',
    canScroll: true,
    footTitle: '',
    noRes: '',
    timerId: '',
    seconds: "获取验证码",
    validateAction: true,
    startTime: '',
    initTimeRemaining: 60 * 1000,
    boss: '',
    ali: '',
    animationData: {},
    tabFlexWidth: '',
    tabWidth:''
  },
  toAli: function () {
    wx.navigateTo({
      url: '../ali/ali',
      success: () => {

      }
    })
  },
  bossHandle: function () {
    app.xhr('POST', '?controller=boss&action=getRegistStatus', { userId: storage.get_s('userId') }, '', (res) => {
      if (res.data.errcode === 0) {

        if (res.data.data.status === 0){
       wx.navigateTo({
         url: '../storeApplication/storeApplication',
       })
        }
        if (res.data.data.status === 1) {
          wx.showToast({
            title: '已经审核通过',
            icon: 'none',
            duration: 2000
          })
        }
        if (res.data.data.status === 2) {
          wx.showToast({
            title: '审核中',
            icon: 'none',
            duration: 2000
          })
        }

      }else{
        wx.showToast({
          title: res.data.errmsg,
          icon: 'none',
          duration: 2000
        })
      }
    })
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
  codeHandle: function (e) {
    this.setData({ code: e.detail.value })
  },
  tick: function () {
    let seconds
    let elapsed = new Date() - this.data.startTime;
    let timeRemaining = this.data.initTimeRemaining - elapsed;
    if (timeRemaining < 0) {
      this.setData({ seconds: "获取验证码", validateAction: true })
      clearInterval(this.data.timerId);
    } else {
      seconds = Math.ceil(timeRemaining / 1000);
      this.setData({ seconds })
    }
  },
  validate: function () {
    if (this.validateMobile(this.data.phone)) {
      if (this.data.validateAction === true) {
        this.setData({ validateAction: false, startTime: new Date() })
        app.xhr('POST', '?controller=sms&action=bindPhoneSms', { userId: storage.get_s('userId'), phone: this.data.phone }, '', (res) => {
          if (res.data.errcode === 0) {
            wx.showToast({
              title: res.data.errmsg,
              icon: 'success',
              duration: 1200,
              mask: true,
              success: () => {
                this.setData({ timerId: setInterval(this.tick, 1000) })
              }
            })

          }
        })
      }

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
  },
  tabAnimation: function (width) {
    animation.translateX(this.data.tabWidth / 2 + width).step()
    this.setData({ animationData: animation.export() })
  },
  clickTop: function (e) {
    if (this.data.canClickTop === true) {

      this.setData({ selected: e.currentTarget.dataset.id, canScroll: true, p: { page: 1, pagesize: 10 }, count: '', count_price: '', list: [], footTitle: '', noRes: '', canClickTop: false, boss: '', ali: '' })

      if (e.currentTarget.dataset.id === 0) {
        this.tabAnimation(0)
        this.firstRes(storage.get_s('userId'))
      }

      if (e.currentTarget.dataset.id === 1) {
        this.tabAnimation(this.data.tabFlexWidth)
        wx.showNavigationBarLoading()
        this.getX2Order(storage.get_s('userId'), this.data.p, (cbRes) => {

          if (cbRes.data.errcode === 0) {
            if (cbRes.data.data.list.length === 0) {
              this.setData({ noRes: '暂无记录' })
            } else {
              if (cbRes.data.data.pagecount === 1) {
                this.setData({ canScroll: false, footTitle: '以上是全部外卖记录' })
              }
              this.setData({ list: cbRes.data.data.list, count_price: cbRes.data.data.money, count: cbRes.data.data.count, totalPage: cbRes.data.data.pagecount })
            }
          } else if (cbRes.data.errcode === 300) {
            this.setData({ display: 'block' })
          } else {
            wx.showToast({
              title: cbRes.data.errmsg,
              icon: 'none',
              duration: 2000
            })

          }

          if (cbRes.data.errcode === 212) {
            storage.remove('userId')
          }
          wx.hideNavigationBarLoading()
          this.setData({ canClickTop: true })
        })
      }

      if (e.currentTarget.dataset.id === 2) {
        this.tabAnimation(this.data.tabFlexWidth * 2)

        wx.showNavigationBarLoading()
        this.getInvoiceList(storage.get_s('userId'), this.data.p, (cbRes) => {

          if (cbRes.data.errcode === 0) {
            if (cbRes.data.data.data.list.length === 0) {
              this.setData({ noRes: '暂无记录' })
            } else {
              if (cbRes.data.data.data.pagecount === 1) {
                this.setData({ canScroll: false, footTitle: '以上是全部开票记录' })
              }
              this.setData({ list: cbRes.data.data.data.list, count_price: cbRes.data.data.data.count_price, count: cbRes.data.data.data.count, totalPage: cbRes.data.data.data.pagecount })
            }
          } else {
            wx.showToast({
              title: cbRes.data.errmsg,
              icon: 'none',
              duration: 2000
            })

          }

          if (cbRes.data.errcode === 212) {
            storage.remove('userId')
          }
          wx.hideNavigationBarLoading()
          this.setData({ canClickTop: true })
        })
      }





    }




  },
  close: function () {
    this.setData({ display: 'none' })
  },
  touchWindow: function () {
    this.setData({ display: 'block' })
  },

  submit: function () {
    if (this.data.phone === '') {
      wx.showToast({
        title: '请输入手机号码',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (this.data.code === '') {
      wx.showToast({
        title: '请输入验证码',
        icon: 'none',
        duration: 2000
      })
      return
    }
    app.xhr('POST', '?controller=consumer&action=bindPhone', { userId: storage.get_s('userId'), phone: this.data.phone, code: this.data.code }, '', (res) => {
      if (res.data.errcode === 0) {
        wx.showToast({
          title: '操作成功',
          icon: 'none',
          duration: 2000
        })
        this.setData({ display: 'none' })

        this.getX2Order(storage.get_s('userId'), this.data.p, (cbRes) => {
          if (cbRes.data.data.pagecount === 1) {
            this.setData({ canScroll: false, footTitle: '以上是全部外卖记录' })
          }
          this.setData({ list: cbRes.data.data.list, count_price: cbRes.data.data.money, count: cbRes.data.data.count, totalPage: cbRes.data.data.pagecount })
        })

      } else {
        wx.showToast({
          title: res.data.errmsg,
          icon: 'none',
          duration: 2000
        })
      }
    })



  },
  lower: function () {
    console.log(34556)

  },

  getX1Order: function (userId, p, cb) {
    app.xhr('POST', '?controller=order&action=getX1Order', { userId, page: p.page, pagesize: p.pagesize }, '', (res) => {
      if (typeof (cb) === "function") {
        cb(res)
      }
    })
  },

  firstRes: function (userId) {
    wx.showNavigationBarLoading()
    this.getX1Order(userId, this.data.p, (cbRes) => {
      if (cbRes.data.errcode === 0) {
        this.setData({ boss: cbRes.data.data.boss, ali: cbRes.data.data.ali})
        if (cbRes.data.data.list.length === 0) {
          this.setData({ noRes: '暂无记录' })
        } else {
          if (cbRes.data.data.pagecount === 1) {
            this.setData({ canScroll: false, footTitle: '以上是全部吃饭记录' })
          }
          this.setData({ list: cbRes.data.data.list, count_price: cbRes.data.data.money, count: cbRes.data.data.count, totalPage: cbRes.data.data.pagecount })
        }
      } else {
        wx.showToast({
          title: cbRes.data.errmsg,
          icon: 'none',
          duration: 2000
        })

      }

      if (cbRes.data.errcode === 212) {
        storage.remove('userId')
      }
      wx.hideNavigationBarLoading()
      this.setData({ canClickTop: true })
    })
  },

  getX2Order: function (userId, p, cb) {
    app.xhr('POST', '?controller=order&action=getX2Order', { userId, page: p.page, pagesize: p.pagesize }, '', (res) => {
      if (typeof (cb) === "function") {
        cb(res)
      }
    })
  },

  getInvoiceList: function (user_id, p, cb) {
    app.xhr('POST', '?controller=invoice&action=getInvoiceList', { user_id, page: p.page, pagesize: p.pagesize }, '', (res) => {
      if (typeof (cb) === "function") {
        cb(res)
      }
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

                  this.firstRes(res2.data.data.user_id)
                })
              }
            })
          }
          if (res.data.errcode === 0) {
            storage.set('userId', res.data.data.user_id)

            this.firstRes(res.data.data.user_id)
          }
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let res = wx.getSystemInfoSync()
    let tabFlexWidth = res.windowWidth / 3    
    let tabWidth = (tabFlexWidth / 2).toFixed(2)
    this.setData({ tabWidth })//要比animationData先写入data才能生效
    animation.translateX(tabWidth / 2).step()

    this.setData({ tabFlexWidth, animationData: animation.export(), width: res.windowWidth, height: res.windowHeight, left: res.windowWidth / 2 - res.windowWidth * 0.8 / 2, top: res.windowHeight / 2 - 105 })
    if (storage.get_s('userId')) {
      this.firstRes(storage.get_s('userId'))
    } else {
      this.login()

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
    clearInterval(this.data.timerId)
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

        this.getX1Order(storage.get_s('userId'), this.data.p, (cbRes) => {
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

        this.getX2Order(storage.get_s('userId'), this.data.p, (cbRes) => {
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

        this.getInvoiceList(storage.get_s('userId'), this.data.p, (cbRes) => {
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