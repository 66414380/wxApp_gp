// pages/orderDetail/orderDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectedPrice: 0,
    display: [true, true],
    list:[
      {id:0,name:"鸡尾",price:"120.00",number:1},
      { id: 1, name: "鸡尾", price: "120.00", number: 1 },
      { id: 2, name: "鸡尾", price: "120.00", number: 1 },
      { id: 3, name: "鸡尾", price: "120.00", number: 1 },
      ],
    list1:[
      { id: 0, name: "外卖平台：", price: "饿了么" },
      { id: 1, name: "下单时间：", price: "2018-02-21 18：08" },
      { id: 2, name: "送达时间：", price: "2018-02-21 18：08" },
      { id: 3, name: "收货地址：", price: "广州广州广州广州广州广州广州广州广州广州广州广州广州广州" },
    ]
  },
  showHandle: function (e) {
    let display = this.data.display
    display[e.currentTarget.dataset.id] = !display[e.currentTarget.dataset.id]
    this.setData({ display })
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