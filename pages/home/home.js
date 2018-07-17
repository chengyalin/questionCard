// pages/home/home.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
    /**
   * 页面的跳转
   */
  bindgetuserinfo: function (e) {
    console.log(e.detail)
    console.log(e.detail.userInfo)
    let openid = app.globalData.openid;
    app.globalData.userInfo = e.detail.userInfo;
    if (app.globalData.userInfo){
      app.userRegister(openid, app.globalData.userInfo)
      wx.navigateTo({
        url: '../workOne/workOne'
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '授权失败，请重新授权或重启小程序',
        showCancel: false,
      })
    }
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
  // onShareAppMessage: function () {//注释后就去掉了转发导航

  // }
})