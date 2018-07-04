//app.js
App({
  onLaunch: function () {
    let that = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    that.userLogin();
  },

  //用户登录请求
  userLogin: function () {
    let that = this;
    // wx.showLoading({
    //   title: '正在登录中...',
    // })
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {
              appid: "wx8589726818d68c94",
              secret: "f0b17bdaa86a056441748cf008c99f44",
              js_code: res.code,
              grant_type: 'authorization_code'
            },
            method: 'GET',
            header: { 'content-type': 'application/json' },
            success: function (response) {
              wx.hideLoading()
              that.globalData.openid = response.data.openid;
              that.getUserInfo();
              console.log(that.globalData.openid)
            }
          })
        } else {
          wx.hideLoading()
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  },

  getUserInfo: function () {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;
              //this.userRegister();
              console.log(this.globalData.userInfo)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
                this.userRegister();
              }
            }
          })
        }
      }
    })
  },

  //用户注册
  userRegister: function () {
    let that = this;
    let url = that.baseUrl + '/user/create/';
    wx.request({
      url: url,
      data: {
        openid: that.globalData.openid,
        nickname: that.globalData.userInfo.nickName,
        headimgurl: that.globalData.userInfo.avatarUrl,
        sex: that.globalData.userInfo.gender,
        city: that.globalData.userInfo.city,
        province: that.globalData.userInfo.province
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  },

  globalData: {
    userInfo: null,
    popupBoxShow: false,
  },


  baseUrl: 'https://tiku.xlxhs.cn'
})



