// pages/myScore/myScore.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    popupBox:false,
    avarageScore: '',
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
    that.getUserScore();
  },

  getUserScore: function(){
    let that = this;
    let url = app.baseUrl + '/bank/grade/query/';
    //真实user_id
    let user_id = app.globalData.user_id;
    //测试数据
    //let user_id = 1;
    wx.request({
      url: url,
      data: {
        user_id: user_id
      },
      success: function(res){
        console.log(res)
        console.log(res.data)
        console.log(res.data.data)
        let datas = res.data.data;
        let scores = [];
        for(let i=0; i<datas.length; i++){
          let score = parseFloat(datas[i].value);
          scores.push(score)
        }
        console.log("scores:" + scores)
        let avarageScore = that.handleScores(scores);
        console.log("avarageScore:" + avarageScore)
        that.setData({
          avarageScore: avarageScore
        })
      } 
    })
  },

  handleScores: function (scores){
    let that = this;
    let len = scores.length;
    let sum = 0;
    for (let i = 0; i < len; i++){
      sum += scores[i];
    }
    console.log("sum:" + sum)
    let avarageScore = parseFloat(sum/len).toFixed(2);
    return avarageScore;
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