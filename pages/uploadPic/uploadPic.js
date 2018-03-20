let app = getApp()
let storage = require('../../utils/util.js')
Page({

  data: {
    id:'',
    registrationNumber:'',
    nameName:'',
    mechanismCode:'',
    mechanismName:'',
    pic:'',
    switch1:'',
  },
  mechanismCodeHandle:function(){
    this.setData({ mechanismCode: e.detail.value })
  },
  mechanismNameHandle:function(){
    this.setData({ mechanismName: e.detail.value })
  },
  registrationNumberHandle:function(){
    this.setData({ registrationNumber: e.detail.value })
  },
  nameNameHandle:function(){
    this.setData({ nameName: e.detail.value })
  },
  uploadPic:function(e){
    wx.chooseImage({
      count: 1, 
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success:  (res)=> {
        let tempFilePaths = res.tempFilePaths
        this.setData({ pic: tempFilePaths })
      }
    })

    
  },
  switchChange:function(e){
    this.setData({ switch1: e.detail.value })
  },
  onLoad: function (options) {
    this.setData({ id: options.id })
    console.log(this.data)

    switch (options.id){
      case '1':
        wx.setNavigationBarTitle({
          title: '营业执照'
        })
      break;
      case '2':
        wx.setNavigationBarTitle({
          title: '组织机构代码'
        })
        break;
      case '3':
        wx.setNavigationBarTitle({
          title: '开户许可证'
        })
        break;
      case '4':
        wx.setNavigationBarTitle({
          title: '税务登记证'
        })
        break;
      case '5':
        wx.setNavigationBarTitle({
          title: '法人证件正面照'
        })
        break;
      case '6':
        wx.setNavigationBarTitle({
          title: '法人证件反面照'
        })
        break;
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})