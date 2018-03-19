// pages/storeApplication/storeApplication.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    display: [true, true],
    name:'',
    tel:'',
    thirdCode:{code1:'',code2:''},
    pic1:''
  },
  submit:function(){
    console.log(this.data)
  },
  thirdCode:function(){
    wx.navigateTo({
      url: `../thirdCode/thirdCode?code1=${this.data.thirdCode.code1}&code2=${this.data.thirdCode.code2}`,
    })
  },
  nameHandle: function (e) {
    this.setData({ name: e.detail.value })
  },
  telHandle:function(e){
    this.setData({ tel: e.detail.value })
  },
  showHandle: function (e) {
    let display = this.data.display
    display[e.currentTarget.dataset.id] = !display[e.currentTarget.dataset.id]
    this.setData({ display })
  },
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