let app = getApp()
let storage = require('../../utils/util.js')
Page({

  data: {
    id: '',
    businessNumber: '',
    businessName: '',
    organizationNumber: '',
    organizationName: '',
    pic: '',
    switch1: '',
  },
  businessNumberHandle: function (e) {
    this.setData({ businessNumber: e.detail.value })
  },
  businessNameHandle: function (e) {
    this.setData({ businessName: e.detail.value })
  },
  organizationNumberHandle: function (e) {
    this.setData({ organizationNumber: e.detail.value })
  },
  organizationNameHandle: function (e) {
    this.setData({ organizationName: e.detail.value })
  },
  uploadPic: function (e) {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        let tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: app.updateUrl, 
          filePath: tempFilePaths[0],
          name: 'filename',
          success:  (res) => {
            let json = JSON.parse(res.data)
            if (json.errcode === 0){
              this.setData({ pic: json.data.file_url })
            }
          }
        })
      }
    })
  },
  switchChange: function (e) {
    this.setData({ switch1: e.detail.value })
  },
  back: function () {
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2]

    switch (this.data.id) {
      case '1':
        if (this.data.pic === '') {
          wx.showToast({
            title: '请上传营业执照',
            icon: 'none',
            duration: 2000
          })
          return
        }
        if (this.data.businessNumber === '') {
          wx.showToast({
            title: '请输入注册号',
            icon: 'none',
            duration: 2000
          })
          return
        }
        if (this.data.businessName === '') {
          wx.showToast({
            title: '请输入字号名称',
            icon: 'none',
            duration: 2000
          })
          return
        }
        prevPage.setData({ businessLongTime: this.data.switch1, businessNumber: this.data.businessNumber, businessName: this.data.businessName, businessImg: this.data.pic })
        break;
      case '2':
        if (this.data.pic === '') {
          wx.showToast({
            title: '请上传组织机构',
            icon: 'none',
            duration: 2000
          })
          return
        }
        if (this.data.organizationNumber === '') {
          wx.showToast({
            title: '请输入机构代码',
            icon: 'none',
            duration: 2000
          })
          return
        }
        if (this.data.organizationName === '') {
          wx.showToast({
            title: '请输入机构名称',
            icon: 'none',
            duration: 2000
          })
          return
        }
        prevPage.setData({ organizationLongTime: this.data.switch1, organizationNumber: this.data.organizationNumber, organizationName: this.data.organizationName, organizationImg: this.data.pic })
        break;
      case '3':
        if (this.data.pic === '') {
          wx.showToast({
            title: '请上传开户许可证',
            icon: 'none',
            duration: 2000
          })
          return
        }
        prevPage.setData({ accountOpeningPermit: this.data.pic })
        break;
      case '4':
        if (this.data.pic === '') {
          wx.showToast({
            title: '请上传税务登记证',
            icon: 'none',
            duration: 2000
          })
          return
        }
        prevPage.setData({ taxRegistrationCertificate: this.data.pic })
        break;
      case '5':
        if (this.data.pic === '') {
          wx.showToast({
            title: '请上传法人证件照正面',
            icon: 'none',
            duration: 2000
          })
          return
        }
        prevPage.setData({ userFront: this.data.pic })
        break;
      case '6':
        if (this.data.pic === '') {
          wx.showToast({
            title: '请上传法人证件照反面',
            icon: 'none',
            duration: 2000
          })
          return
        }
        prevPage.setData({ userReverse: this.data.pic })
        break;
    }

    wx.navigateBack({
      delta: 1
    })
  },
  onLoad: function (options) {
    this.setData({ id: options.id })

    switch (options.id) {
      case '1':
        let switch1
        options.switch1 === 'true' ? switch1 = true : switch1 =false
        wx.setNavigationBarTitle({
          title: '营业执照',
        })
        this.setData({ switch1, businessNumber: options.businessNumber, businessName: options.businessName, pic: options.pic })
        break;
      case '2':
        let switch2
        options.switch1 === 'true' ? switch2 = true : switch2 = false
        wx.setNavigationBarTitle({
          title: '组织机构代码'
        })
        this.setData({ switch1: switch2, organizationNumber: options.organizationNumber, organizationName: options.organizationName, pic: options.pic })
        break;
      case '3':
        wx.setNavigationBarTitle({
          title: '开户许可证'
        })
        this.setData({ pic: options.pic})
        break;
      case '4':
        wx.setNavigationBarTitle({
          title: '税务登记证'
        })
        this.setData({ pic: options.pic })
        break;
      case '5':
        wx.setNavigationBarTitle({
          title: '法人证件正面照'
        })
        this.setData({ pic: options.pic })
        break;
      case '6':
        wx.setNavigationBarTitle({
          title: '法人证件反面照'
        })
        this.setData({ pic: options.pic })
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