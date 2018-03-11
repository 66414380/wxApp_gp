// pages/consumptionRecords/consumptionRecords.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
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
 
    var cxt_arc = wx.createCanvasContext('canvasArc'); 
    cxt_arc.setLineWidth(2);
    cxt_arc.setStrokeStyle('#d2d2d2');
    cxt_arc.setLineCap('round')
    cxt_arc.beginPath();
    cxt_arc.arc(106, 106, 100, 0.7 * Math.PI, 2 * Math.PI, false); //1.6 pi
    cxt_arc.stroke();

    cxt_arc.setLineWidth(6);
    cxt_arc.setStrokeStyle('#FA1301');
    cxt_arc.setLineCap('round')
    cxt_arc.beginPath();
    cxt_arc.arc(106, 106, 100, 0.7 * Math.PI,  Math.PI, false);
    cxt_arc.stroke();

     cxt_arc.draw(); 
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