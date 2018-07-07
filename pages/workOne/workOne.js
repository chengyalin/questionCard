// pages/workOne/workOne.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    workList: [],
    popupBoxShow: false
  },

  popupCancel: function () {//弹窗点击未准备好
    wx.navigateTo({
      url: '../home/home'
    })
  },

  jumpToStart: function () {//弹窗点击确认开始
    let popupBoxShow = this.data.popupBoxShow;
    app.globalData.popupBoxShow = true;
    console.log(popupBoxShow)
    this.setData({
      popupBoxShow: app.globalData.popupBoxShow
    })
  },

  /**
 * 页面的跳转到问题界面
 */
  jumpToQuestion: function (e) {
    console.log(e.currentTarget.dataset.id);
    var section_id = e.currentTarget.dataset.id;
    console.log("section_id:" + section_id)
    wx.navigateTo({
      url: '../question/question?section_id=' + section_id
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
    //真实user_id
    let user_id = app.globalData.user_id;
    console.log('userid'+user_id)
    let popupBoxShow = app.globalData.popupBoxShow;//弹出框显示与否
    console.log(popupBoxShow)
    if (popupBoxShow === true) {
      this.setData({
        popupBoxShow: true
      })
    }
    var that = this
    wx.request({
      url: app.baseUrl + '/bank/section/list/', //接口地址
      data: {

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.setData({ workList: res.data.data })
      }
    })
    // wx.showToast({
    //   title: '加载中',
    //   icon: 'loading',
    //   duration: 1000
    // }) 
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