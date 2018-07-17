// pages/myScoreCheck/myScoreCheck.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.getMyScoreCheck();
    
  },

  getMyScoreCheck: function(){
    let that = this;
    //真实user_id
    let user_id = app.globalData.user_id;
    //测试数据
    //let user_id = 6;
    wx.request({
      url: app.baseUrl + '/bank/grade/query/',
      data: {
        user_id: user_id,
      },
      success: function (res) {
        console.log(res.data.data)
        let chapterScore = res.data.data;
        let handledScore = [];
        let sectionIds = [];
        for (let i = 0; i < chapterScore.length; i++) {
          let chapterValue = parseFloat(chapterScore[i].value);
          let sectionId = chapterScore[i].section_id;
          handledScore.push(chapterValue)
          sectionIds.push(sectionId)
        }
        that.setData({
          chapterScore: res.data.data,
          // 處理之後的每章節題的得分值，String類型變爲Number類型
          handledScore: handledScore,
        });
        console.log("handledScore:" + handledScore)
        that.getSectionList(sectionIds)
      }
    })
  },

  getSectionList: function (sectionIds){
    let that = this;
    let url = app.baseUrl + '/bank/question/query/';
    let chapterScoreData = [];
    let chapterTotalCountData = [];
    let passScores = [];
    for (let i = 0; i < sectionIds.length; i++){
      wx.request({
        url: url,
        data: {
          section_id: sectionIds[i]
        },
        success: function (res) {
          console.log(res.data.data)
          let itemDatas = res.data.data;
          let itemValue = parseFloat(itemDatas.object_list[0].value);
          let itemTotalCount = itemDatas.meta.total_count;
          // 及格分测试数据
          //let passScore = (itemTotalCount * itemValue)*0.02;
          // 正式及格分
          let passScore = (itemTotalCount * itemValue) * 0.6;

          // 單個章節每題的分值
          chapterScoreData.push(itemValue)
          // 总题数
          chapterTotalCountData.push(itemTotalCount)
          // 每章节及格分数
          passScores.push(passScore)
          that.setData({
            chapterScoreData: chapterScoreData,
            chapterTotalCountData: chapterTotalCountData,
            passScores: passScores
          })
          console.log("chapterScoreData:" + chapterScoreData)
          console.log("passScores:" + passScores)
        }
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
  // onShareAppMessage: function () {//注释后就去掉了转发导航

  // }
})