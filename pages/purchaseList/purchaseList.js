// pages/purchaseList/purchaseList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected:0,
    display: 'none',
    width: '',
    height: '',
    topList: [{ id: 0, name: "买单记录" },{ id: 1, name: "外卖记录" },{ id: 2, name: "开票记录" }],
    list1: [
      { id: 0, name: "九毛九", subName: '天河店', price:'188.10' }, 
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
  clickTop:function(e){
    this.setData({ selected: e.currentTarget.dataset.id })
    if (e.currentTarget.dataset.id === 1){
      this.setData({display: 'block'})
    }
  },
  close: function () {
    this.setData({ display: 'none' })
  },
  touchWindow:function(){
    this.setData({ display: 'block' })
  },
  va: function () {
    console.log(33)
  },
  submit:function(){
    console.log(22)
  },
  lower:function(){
    console.log(111)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var res = wx.getSystemInfoSync()
    this.setData({ width: res.windowWidth, height: res.windowHeight, left: res.windowWidth / 2 - res.windowWidth * 0.8 / 2, top: res.windowHeight / 2 - 105 })
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
   console.log(999)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})