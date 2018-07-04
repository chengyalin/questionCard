// pages/myErrorPage/myErrorPage.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
  
  },
  /**
 * 页面的跳转我的错题详情
 */
  jumpToMyErrorPageResult: function (e) {
    let that = this;
    let index = e.target.id;
    console.log(e.target)
    console.log(e.currentTarget)
    console.log("index:" + index)
    let totalCount = e.currentTarget.dataset.totalcount;
    let questionType = e.currentTarget.dataset.questiontype;
    wx.navigateTo({
      url: '../myErrorPageResult/myErrorPageResult?index=' + index + '&totalCount=' + totalCount,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let title = options.title;
    let section_id = options.section_id;
    let logList = wx.getStorageSync("logList");
    console.log("logList:" + logList)
    that.setData({
      logList: logList,
      section_id: section_id,
      title:title
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