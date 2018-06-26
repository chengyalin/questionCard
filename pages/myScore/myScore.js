// pages/myScore/myScore.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    popupBox:false,
    completePercent:50
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let popupBoxShow = app.globalData.popupBoxShow;
    console.log(popupBoxShow)
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