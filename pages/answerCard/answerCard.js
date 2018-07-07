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
    let that = this;
    let section_id = that.data.section_id;
    //真实user_id
    let user_id = app.globalData.user_id;
    //测试数据
    //let user_id = 1;
    let data = wx.getStorageSync("data");
    // let finishedItems = that.calculateObjAttrLength(data);
    let meta = wx.getStorageSync("metaName")
    console.log(meta)
    let totalCount = meta['total_count'];
    console.log(meta.total_count)
    wx.request({
      url: app.baseUrl + '/bank/question/check/',
      data: {
        data: data,
        user_id: user_id,
        section_id: section_id
      },
      success: function (res) {
        // 防止用户按返回键之后答题卡出现空白的情况，所以不能删除
        // wx.removeStorageSync("questionStatus" + section_id)
        that.setData({ popupBox: false });
        console.log(res.data)
        let userScore = res.data.data;
        let section_id = that.data.section_id;
        wx.navigateTo({
          url: '../answerCardResult/answerCardResult?userScore=' + userScore + '&totalCount=' + totalCount + '&section_id=' + section_id,
        })
      }
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