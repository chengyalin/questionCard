// pages/collectionDetail/collectionDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectShowNo: true,//收藏的图显示
  },
  /**
 * 页面的跳转
 */
  jumpTocollectionDetailResult: function (e) {
    let that = this;
    let index = e.target.id;
    console.log("index:" + index)
    let totalCount = e.currentTarget.dataset.totalcount;
    console.log("totalCount:" + totalCount)
    wx.navigateTo({
      url: '../collectionDetailResult/collectionDetailResult?index=' + index + '&totalCount=' + totalCount,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let section_id = options.section_id;
    let id = options.id;
    let title = options.title;
    console.log("section_id:" + section_id)
    let bookmarkList = wx.getStorageSync("bookmarkList");
    console.log("bookmarkList:" + bookmarkList)
    that.setData({
      bookmarkList: bookmarkList,
      section_id: section_id,
      id: id,
      title: title
    })
  },
  
  deleteCollection: function (e) {// 点击星星取消收藏，并且将题目从我的收藏列表删除
    let that = this;
    let question_id = e.target.dataset.id;
    //真实user_id
    let user_id = app.globalData.user_id;
    //测试数据
    //let user_id = 1;
    let section_id = that.data.section_id;
    that.getCollectionCancel(question_id, user_id, section_id);
    wx.showToast({
      title: '您已经成功取消收藏了',
      icon: 'none'
    })
  },

  // 收藏题目取消
  getCollectionCancel: function (question_id, user_id, section_id) {
    let that = this;
    let colectionUrl = app.baseUrl + '/bank/bookmark/delete/?question_id=' + question_id + '&user_id=' + user_id + '&section_id=' + section_id;
    wx.request({
      url: colectionUrl,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        let bookmarkList = res.data.data;
        wx.setStorageSync("bookmarkList", bookmarkList);
        that.setData({
          bookmarkList: bookmarkList
        })
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