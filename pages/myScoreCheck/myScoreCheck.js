// pages/myScoreCheck/myScoreCheck.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chapterScore:[],
    chapterBoxScore:false,
    resultComment: ''
  },
  getResultComment: function (completePercent) {
    let that = this;
    switch (true) {
      case completePercent < 60:
        that.setData({
          resultComment: "不及格",
          chapterBoxScore:true
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
    // let userScore = options.userScore;
    // let totalItems = options.totalCount;
    // let rightItems = userScore / 0.5;
    //测试数据
    let totalItems = 100;
    let rightItems = 49;
    let userScore = 80;
    let completePercent = parseInt((rightItems / totalItems) * 100);
    console.log(completePercent)
    that.getResultComment(completePercent);
    that.setData({
      completePercent: completePercent,
      userScore: userScore,
    })
    
    let user_id = 1;
    wx.request({
      url: app.baseUrl + '/bank/grade/query/',
      data: {
        user_id: user_id,
      },
      success: function (res) {
        console.log(res.data)
        that.setData({ chapterScore: res.data.data });
      }
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