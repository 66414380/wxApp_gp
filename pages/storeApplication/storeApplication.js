let app = getApp()
let storage = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    display: [true, true],
    companyName: '',//商户名称
    tel: '',//联系电话
    thirdCode: { code1: '', code2: '' },//第三方编码
    businessImg: '',//营业执照url
    businessLongTime: true, //营业执照是否长期有效
    businessNumber: '',//营业执照号
    businessName: '',//营业执照字号名称
    organizationImg: '',//组织机构代码图片url
    organizationLongTime: true,//组织架构代码是否长期有效
    organizationNumber: '',//组织机构代码号
    organizationName: '',//机构名称
    accountOpeningPermit: '',//开户许可证url
    taxRegistrationCertificate: '',//税务登记证url
    userFront: '',//法人证件照正面
    userReverse: '',//法人证件照反面
  },
  uploadPic: function (e) {
    switch (e.currentTarget.dataset.id) {
      case 1:
        wx.navigateTo({
          url: `../uploadPic/uploadPic?id=${e.currentTarget.dataset.id}&switch1=${this.data.businessLongTime}&businessNumber=${this.data.businessNumber}&businessName=${this.data.businessName}&pic=${this.data.businessImg}`,
        })
        break;
      case 2:
        wx.navigateTo({
          url: `../uploadPic/uploadPic?id=${e.currentTarget.dataset.id}&switch1=${this.data.organizationLongTime}&organizationNumber=${this.data.organizationNumber}&organizationName=${this.data.organizationName}&pic=${this.data.organizationImg}`,
        })
        break;
      case 3:
        wx.navigateTo({
          url: `../uploadPic/uploadPic?id=${e.currentTarget.dataset.id}&pic=${this.data.accountOpeningPermit}`,
        })
        break;
      case 4:
        wx.navigateTo({
          url: `../uploadPic/uploadPic?id=${e.currentTarget.dataset.id}&pic=${this.data.taxRegistrationCertificate}`,
        })
        break;
      case 5:
        wx.navigateTo({
          url: `../uploadPic/uploadPic?id=${e.currentTarget.dataset.id}&pic=${this.data.userFront}`,
        })
        break;
      case 6:
        wx.navigateTo({
          url: `../uploadPic/uploadPic?id=${e.currentTarget.dataset.id}&pic=${this.data.userReverse}`,
        })
        break;
    }

  },
  submit: function () {
   
    if (this.data.companyName === '') {
      wx.showToast({
        title: '请输入开户名称',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (this.data.tel === '') {
      wx.showToast({
        title: '请输入联系电话',
        icon: 'none',
        duration: 2000
      })
      return
    }
    let validate = /^([0-9]|[-])+$/g;
    
    if (!validate.test(this.data.tel)){
      wx.showToast({
        title: '请输入正确电话格式',
        icon: 'none',
        duration: 2000
      })
      return
    }

    if (this.data.businessImg === '') {
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
    if (this.data.organizationImg === '') {
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
    if (this.data.accountOpeningPermit === '') {
      wx.showToast({
        title: '请上传开户许可证',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (this.data.taxRegistrationCertificate === '') {
      wx.showToast({
        title: '请上传税务登记证',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (this.data.userFront === '') {
      wx.showToast({
        title: '请上传法人证件照正面',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (this.data.userReverse === '') {
      wx.showToast({
        title: '请上传法人证件照反面',
        icon: 'none',
        duration: 2000
      })
      return
    }

    app.xhr('POST', '?controller=boss&action=saveRegist', {
      userId: storage.get_s('userId'),
      companyName: this.data.companyName,
      tel: this.data.tel,
      thirdCode: this.data.thirdCode,
      businessImg: this.data.businessImg,
      businessLongTime: this.data.businessLongTime === true ? 1: 0,
      businessNumber: this.data.businessNumber,
      businessName: this.data.businessName,
      organizationImg: this.data.organizationImg,
      organizationLongTime: this.data.organizationLongTime === true ? 1 : 0,
      organizationNumber: this.data.organizationNumber,
      organizationName: this.data.organizationName,
      accountOpeningPermit: this.data.accountOpeningPermit,
      taxRegistrationCertificate: this.data.taxRegistrationCertificate,
      userFront: this.data.userFront,
      userReverse: this.data.userReverse,
    }, '', (res) => {
      if (res.data.errcode === 0) {
        wx.showToast({
          title: res.data.errmsg,
          icon: 'none',
          duration: 2000,
          success:()=>{
            setTimeout(()=>{
              wx.navigateBack({
                delta: 1
              })
            },2000)
          }
        })

      } else {
        wx.showToast({
          title: res.data.errmsg,
          icon: 'none',
          duration: 2000,
        })
      }
    })

  },
  thirdCode: function () {
    wx.navigateTo({
      url: `../thirdCode/thirdCode?code1=${this.data.thirdCode.code1}&code2=${this.data.thirdCode.code2}`,
    })
  },
  nameHandle: function (e) {
    this.setData({ companyName: e.detail.value })
  },
  telHandle: function (e) {
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

  }
})