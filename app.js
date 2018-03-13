let storage = require('./utils/util.js')
Date.prototype.format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1,                 //月份
    "d+": this.getDate(),                    //日
    "h+": this.getHours(),                   //小时
    "m+": this.getMinutes(),                 //分
    "s+": this.getSeconds(),                 //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds()             //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};

const baseUrl = 'http://test0.kuan1.cn/wxapp/index.php';
App({
  xhr: function (method, url, obj = null, token = '', cb) {
    wx.request({
      url: baseUrl + url,
      data: obj,
      method,
      header: {
        'Accept': 'application/json',
        'token': token
      },
      success: function (res) {
        if (typeof (cb) == "function") {
          cb(res)
        }
      },
      fail: function (error) {
        console.log(error)
      }
    })
  },

  onLaunch: function () {
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.model)
        console.log(res.pixelRatio)
        console.log(res.windowWidth)
        console.log(res.windowHeight)
        console.log(res.language)
        console.log(res.version)
        console.log(res.platform)
      }
    })


    let login = () => {
      console.log(444)
      wx.login({
        success: (res) => {
          this.xhr('POST', '?controller=consumer&action=codeGetUserIofo', { wx_appid: 'wx3d7c7e70e4850853', code: res.code }, '', (res) => {
            if (res.data.errcode === 1) {
              wx.getUserInfo({
                success: (res1) => {
                  this.xhr('POST', '?controller=consumer&action=wxUserInfoGetOursInfo', { wx_appid: 'wx3d7c7e70e4850853', session_token: res.data.data.session_token, vi: res1.iv, encrypte_data: res1.encryptedData }, '', (res2) => {
                    storage.set('userId', res2.data.data.user_id)
                  })
                }
              })
            }
            if (res.data.errcode === 0) {
              storage.set('userId', res.data.data.user_id)
            }
          })
        }
      })
    }

    //login()

    // wx.getSetting({
    //   success(res) {
    //     if (!res.authSetting['scope.userInfo']) {
    //       wx.authorize({
    //         scope: 'scope.userInfo',
    //         success: () => { },
    //         fail: () => {
    //           wx.openSetting({
    //             success: (res) => {
    //               login()
    //             }
    //           })
    //         }
    //       })
    //     }
    //   }
    // })
  },
})
