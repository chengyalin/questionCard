// pages/myErrorPageResult/myErrorPageResult.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    commentsList: [],
    commentListAreaShow: true,
    imgUrl: '/images/up.png',
    commentListArea: true,
    commentValue: '',
    selectedAAnswer: false,
    selectedBAnswer: false,
    selectedCAnswer: false,
    selectedDAnswer: false,
    A: 'A',
    B: 'B',
    C: 'C',
    D: 'D'
  },
  // 讨论区的显示与隐藏
  clickUpDown: function (e) {
    let that = this;
    let commentListAreaShow = that.data.commentListAreaShow;
    if (commentListAreaShow === true) {
      that.setData({
        commentListAreaShow: false,
        imgUrl: '/images/down.png',
        commentListArea: false
      })
    } else {
      that.setData({
        commentListAreaShow: true,
        imgUrl: '/images/up.png',
        commentListArea: true
      })
    }
  },

  sendMessage: function () {
    var that = this
    that.getUserComments()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let index = parseInt(options.index);
    let totalCount = options.totalCount;
    let logList = wx.getStorageSync("logList");
    let questionInfo = logList[index].question_info;
    let userChoice = logList[index].you_choice;
    // 测试数据
    // logList[index].question_info['question_type'] = 2;
    let questionType = logList[index].question_info.question_type;
    let rightAnswer = questionInfo.answer;
    that.setData({
      index: index,
      totalCount: totalCount,
      questionType: questionType,
      questionInfo: questionInfo,
      userChoice: userChoice,
      rightAnswer: rightAnswer
    })
    that.getCommentsList();
  },

  //讨论区的评论列表展示
  getCommentsList: function () {
    var that = this;
    let userInfo = app.globalData.userInfo;
    that.setData({
      userInfo: userInfo
    });

    wx.request({
      url: app.baseUrl + '/bank/comment/list/', //讨论区留言列表接口地址
      data: {
        user_id: 1,
        question_id: 1
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data.data)
        that.setData({ commentsList: res.data.data })
      }
    })
  },

  //通过bindinput事件获取用户输入的评论，并保存至data中
  getUserCommentContent: function (e) {
    let that = this;
    let commentValue = e.detail.value;
    that.setData({
      commentValue: commentValue
    })
  },

  getUserComments: function () {
    let that = this
    let commentValue = that.data.commentValue;
    if (commentValue) {
      wx.request({
        url: app.baseUrl + '/bank/comment/create/', //讨论区用户对题目发表评论
        data: {
          user_id: 1,
          question_id: 1,
          comment: commentValue
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res.data)
          that.setData({
            commentValue: ''
          })
          that.getCommentsList()
        }
      })
    } else {
      wx.showToast({
        title: '评论不能为空哦~',
        icon: 'none'
      })
    }
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