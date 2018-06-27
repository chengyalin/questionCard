// pages/myScore/myScore.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    popupBox:false,
    completePercent: '',
    resultComment: '',
  },
  popupBoxShow: function () {//弹窗显示
    this.setData({ popupBox: true });
  },
  popupCancel: function () {//弹窗取消
    this.setData({ popupBox: false })
  },
  jumpToWriteInfo: function () {//弹窗可跳转去登录填写信息
    wx.navigateTo({
      url: '../writeInfo/writeInfo'
    })
    this.setData({ popupBox: false })
  },
  /**
  * 页面的跳转查看成绩
  */
  jumpToMyScoreCheck: function () {
    wx.navigateTo({
      url: '../myScoreCheck/myScoreCheck'
    })
  },
  /**
  * 页面的跳转单元
  */
  jumpToWorkOne: function () {
    wx.redirectTo({
      url: '../workOne/workOne'
    })
  },
  /**
  * 页面的跳转收藏
  */
  jumpToCollection: function () {
    wx.redirectTo({
      url: '../collection/collection'
    })
  },
  /**
  * 页面的跳转成绩
  */
  jumpToScore: function () {
    wx.redirectTo({
      url: '../myScore/myScore'
    })
  },
  getResultComment: function (completePercent) {
    let that = this;
    switch (true) {
      case completePercent < 60:
        that.setData({
          resultComment: "不及格"
        })
        break;
      case completePercent >= 60 && completePercent <= 100:
        that.setData({
          resultComment: "及格"
        })
        break;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let userInfo = app.globalData.userInfo;
    that.setData({
       userInfo: userInfo
    });

    let popupBoxShow = app.globalData.popupBoxShow;
    console.log(popupBoxShow)
    // 页面初始化 options为页面跳转所带来的参数

    let userScore = options.userScore;
    let totalItems = options.totalCount;
    let rightItems = userScore / 0.5;
    //测试数据
    // let totalItems = 100;
    // let rightItems = 59;
    // let userScore = 80;
    let completePercent = parseInt((rightItems / totalItems) * 100);
    console.log(completePercent)
    that.getResultComment(completePercent);
    that.setData({
      completePercent: completePercent,
      userScore: userScore,
    })

   
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