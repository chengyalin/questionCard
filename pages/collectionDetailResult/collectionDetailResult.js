// pages/collectIionDetailResult/collectionDetailResult.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectedAAnswer: false,
    selectedBAnswer: false,
    selectedCAnswer: false,
    selectedDAnswer: false,
    A: 'A',
    B: 'B',
    C: 'C',
    D: 'D',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let index = parseInt(options.index);
    let totalCount = options.totalCount;
    let bookmarkList = wx.getStorageSync("bookmarkList");
    let questionInfo = bookmarkList[index].question_info;
    // 测试数据
    // logList[index].question_info['question_type'] = 2;
    let questionType = bookmarkList[index].question_info.question_type;
    let rightAnswer = questionInfo.answer;
    that.setData({
      index: index,
      totalCount: totalCount,
      questionType: questionType,
      questionInfo: questionInfo,
      rightAnswer: rightAnswer
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