// pages/answerCard/answerCard.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  /**
  * 页面的跳转交卷查看结果
  */
  jumpToAnswerCardResult: function () {
    wx.navigateTo({
      url: '../answerCardResult/answerCardResult'
    })
  },

  jumpToQuestion: function (e) {
    let that = this;
    let section_id = that.data.section_id;
    let questionNum = e.currentTarget.id;
    wx.navigateTo({
      url: '../question/question?page=' + questionNum + '&section_id=' + section_id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let section_id = options.section_id;
    console.log("section_id:" + section_id)
    let questionStatus = wx.getStorageSync("questionStatus" + section_id)
    console.log("questionStatus:" + questionStatus)
    that.setData({
      questionStatus: questionStatus,
      section_id: section_id
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