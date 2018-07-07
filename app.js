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
          console.log('code是'+res.code)
          wx.request({
            url:'https://tiku.xlxhs.cn/user/openid/query/', //接口地址
            data: {
              code: res.code,
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (response) {
              wx.hideLoading()
              that.globalData.openid = response.data.data.openid;
              console.log("openid:" + that.globalData.openid)
              // that.getAuthorized(that.globalData.openid);
            }
          })
        } else {
          wx.hideLoading()
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  },

  getAuthorized: function (openid) {
    console.log(openid)
    let that = this;
    // 可以通过 wx.getSetting 先查询一下用户是否授权了 'scope.userInfo' 这个 scope
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              that.getUserInformation(openid)
            }
          })
        }else{
          that.getUserInformation(openid)
        }
      }
    })
  },

  getUserInformation: function (openid){
    let that = this;
    wx.getUserInfo({
      success: res => {
        this.globalData.userInfo = res.userInfo;
        console.log("userInfo:" + res.userInfo)
        console.log("userInfo:" + this.globalData.userInfo)
        this.userRegister(openid, res.userInfo);
      },
    })
  },

  //用户注册
  userRegister: function (openid, userInfo) {
    let that = this;
    let url = that.baseUrl + '/user/create/';
    wx.request({
      url: url,
      data: {
        openid: openid,
        nickname: userInfo.nickName,
        headimgurl: userInfo.avatarUrl,
        sex: userInfo.gender,
        city: userInfo.city,
        province: userInfo.province
      },
      success: function (res) {
        console.log(res.data)
        that.globalData.user_id = res.data.data.user_id;//用户id
        console.log('user_id' + that.globalData.user_id)
      }
    })
  },

  globalData: {
    userInfo: null,
    popupBoxShow: false,
    openid: ''
  },


  baseUrl: 'https://tiku.xlxhs.cn'
})



