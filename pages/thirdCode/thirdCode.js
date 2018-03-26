// pages/thirdCode/thirdCode.js
Page({
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
  }

})