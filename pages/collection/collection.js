// pages/collection/collection.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected: true,
    selected1: false
  },
  selected: function (e) {//题目收藏
    this.setData({
      selected1: false,
      selected: true
    })
    let that = this;
    let collectionItems = that.data.collectionItems;
    //保证数据只请求一次
    if (!collectionItems){
      that.getMyCollection();
    }
  },
  selected1: function (e) {//我的错题
    this.setData({
      selected: false,
      selected1: true
    })
    let that = this;
    let myErrorPages = that.data.myErrorPages;
    //保证数据只请求一次
    if (!myErrorPages){
      that.getMyErrorPage();
    }
  },
  /**
 * 页面的跳转收藏题目详情
 */
  jumpTocollectionDetail: function (e) {
    let that = this;
    let collectionItems = that.data.collectionItems;
    let title = e.target.dataset.title;
    let section_id = e.target.dataset.section_id;
    let id = e.target.id;
    if(id){
      let bookmarkList = collectionItems[id].bookmark_list;
      wx.setStorageSync("bookmarkList", bookmarkList)
      wx.navigateTo({
        url: '../collectionDetail/collectionDetail?section_id=' + section_id + '&title=' + title + '&id=' + id,
      })
    }
  },
  /**
* 页面的跳转我的错题详情
*/
  jumpToMyErrorPage: function (e) {
    let that = this;
    let myErrorPages = that.data.myErrorPages;
    let title = e.target.dataset.title;
    let section_id = e.target.dataset.section_id;
    let id = e.target.id;
    if (id) {
      let logList = myErrorPages[id].log_list;
      wx.setStorageSync("logList", logList)
      wx.navigateTo({
        url: '../myErrorPage/myErrorPage?section_id=' + section_id + '&title=' + title,
      })
    }
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
    let that = this;
    let popupBoxShow = app.globalData.popupBoxShow;
    console.log(popupBoxShow)
    let selected1 = options.selected1;
    if (selected1){
      that.setData({
        selected1: true,
        selected: false
      })
      that.getMyErrorPage();
    }else{
      that.getMyCollection();
    }
  },

  getMyErrorPage: function(){
    let that = this;
    // let user_id = app.globalData.user_id;
    // 测试数据
    let user_id = 1;
    wx.request({
      url: app.baseUrl + '/bank/errorlog/query/?user_id=' + user_id,
      success: function (res) {
        console.log(res.data.data)
        let myErrorPages = res.data.data;
        wx.setStorageSync("myErrorPages", myErrorPages)
        that.setData({
          myErrorPages: myErrorPages
        })
      }
    })
  },

  getMyCollection: function(){
    let that = this;
    // let user_id = app.globalData.user_id;
    // 测试数据
    let user_id = 1;
    wx.request({
      url: app.baseUrl + '/bank/bookmark/query/?user_id=' + user_id,
      success: function (res) {
        console.log(res.data.data)
        let collectionItems = res.data.data;
        wx.setStorageSync("collectionItems", collectionItems)
        that.setData({
          collectionItems: collectionItems
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
    let that = this;
    wx.showToast({
      title: '刷新中...',
      icon: 'loading'
    })
    that.getMyCollection();
    wx.stopPullDownRefresh()
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