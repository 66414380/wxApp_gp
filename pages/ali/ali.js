let app = getApp()
let storage = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_url:''
  },

  saveImgToPhotosAlbumTap:function(){
    wx.downloadFile({
      url: this.data.img_url,
      success: function (res) {
        console.log(res)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (res) {
            wx.showToast({
              title: '保存相片成功',
              icon: 'none',
              duration: 2000
            })
          },
          fail: function (res) {
            console.log(res)
            console.log('fail')
          }
        })
      },
      fail: function () {
        console.log('fail')
      }
    })
  },
  onLoad: function (options) {
    app.xhr('POST', '?controller=consumer&action=bindAliPay', { userId: storage.get_s('userId') }, '', (res) => {
      if (res.data.errcode === 0) {
        this.setData({ img_url: res.data.data })
      } else {
        wx.showToast({
          title: res.data.errmsg,
          icon: 'none',
          duration: 2000
        })
      }
    })
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