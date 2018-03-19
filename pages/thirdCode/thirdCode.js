// pages/thirdCode/thirdCode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  code1:'',
  code2:''
  },

  
  code1Handle: function (e) {
    this.setData({ code1: e.detail.value })
  },
  code2Handle: function (e) {
    this.setData({ code2: e.detail.value })
  },

  back(){
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2]
    prevPage.setData({
      thirdCode: { code1: this.data.code1, code2: this.data.code2 }
    })
    wx.navigateBack({
      delta: 1
    })
  },
  onLoad: function (options) {
    this.setData({ code1: options.code1, code2: options.code2 })
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})