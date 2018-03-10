// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dateStart:'2018-03-10',
    dateEnd: '2018-03-10',
    timeStart:'11:00',
    timeEnd: '11:00',
    selected: 0,
    list1: [
      { id: 0, name: "九毛九", subName: '天河店', price: '188.10' },
      { id: 1, name: "九毛九", subName: '天河店', price: '88.00' },
      { id: 2, name: "九毛九", subName: '天河店', price: '88.00' },
      { id: 3, name: "九毛九", subName: '天河店', price: '88.00' },
      { id: 4, name: "九毛九", subName: '天河店', price: '88.00' },
      { id: 5, name: "九毛九", subName: '天河店', price: '88.00' },
      { id: 6, name: "九毛九", subName: '天河店', price: '88.00' },
      { id: 7, name: "九毛九", subName: '天河店', price: '88.00' },
      { id: 8, name: "九毛九99", subName: '天河店', price: '88.00' },
    ]
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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