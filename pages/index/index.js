let app = getApp()
let storage = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
  name:'',
  brand:'',
  phone:'',
  code:'',
  showBoss:'',
  timerId: '',
  seconds: "获取验证码",
  validateAction: true,
  startTime: '',
  initTimeRemaining: 60 * 1000,
  },
  submit:function(){
  if(this.data.showBoss === true){
    wx.redirectTo({
      url: '../scanCode/scanCode',
      success: () => {

      }
    })
  }else{
    if (this.data.name === '') {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (this.data.brand === '') {
      wx.showToast({
        title: '请输入餐厅品牌',
        icon: 'none',
        duration: 2000
      })
      return
    }
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
    app.xhr('POST', '?controller=boss&action=saveBossData', { userId: storage.get_s('userId'), realName: this.data.name, brand: this.data.brand, phone: this.data.phone, code: this.data.code }, '', (res) => {
      if (res.data.errcode === 0) {
        wx.showToast({
          title: '操作成功',
          icon: 'none',
          duration: 2000,
          success: () => {
            wx.redirectTo({
              url: '../scanCode/scanCode',
              success: () => {
              }
            })
          }
        })
      } else {
        wx.showToast({
          title: res.data.errmsg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  }


    
  },
  nameHandle:function(e){
    this.setData({ name: e.detail.value })
  },
  brandHandle: function (e) {
    this.setData({ brand: e.detail.value })
  },
  phoneHandle: function (e) {
    this.setData({ phone: e.detail.value })
  },
  codeHandle:function(e){
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
  validateMobile: function (mobile) {
    let validate = /^1[3|5|7|8]\d{9}$/;
    return validate.test(mobile);
  },
  validate: function () {
    if (this.data.showBoss === false) {
      if (this.validateMobile(this.data.phone)) {
        if (this.data.validateAction === true) {
          this.setData({ validateAction: false, startTime: new Date() })
          app.xhr('POST', '?controller=sms&action=bindBossSms', { userId: storage.get_s('userId'), phone: this.data.phone }, '', (res) => {
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
    }


    
  },
  firstRes: function (userId) {
    wx.showNavigationBarLoading()
    app.xhr('POST', '?controller=boss&action=getBossData', { userId },'',(res)=>{
      if (res.data.errcode === 0){
        this.setData({ showBoss: true, name: res.data.data.real_name, brand: res.data.data.brand, phone: res.data.data.phone})


      } else if (res.data.errcode === 201){
        this.setData({ showBoss:false})
      }
      wx.hideNavigationBarLoading()
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
  onLoad: function (options) {
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})