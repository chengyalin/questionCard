// pages/answerCardResult/answerCardResult.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    completePercent: '',
    resultComment: '',
    timer: ''
  },
  /**
 * 页面的跳转我的错题，我的错题在收藏界面，直接跳转收藏
 */
  jumpTomyErrorPage: function () {
    wx.navigateTo({
      url: '../collection/collection'
    })
  },
  /**
  * 页面的跳转重新测试
  */
  jumpToWorkOne: function () {
    wx.navigateTo({
      url: '../workOne/workOne'
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
      // case completePercent >= 70 && completePercent < 80:
      //   that.setData({
      //     resultComment: "中等"
      //   })
      //   break;
      // case completePercent >= 80 && completePercent < 90:
      //   that.setData({
      //     resultComment: "良好"
      //   })
      //   break;
      // case completePercent >= 90 && completePercent < 95:
      //   that.setData({
      //     resultComment: "优秀"
      //   })
      //   break;
      // case completePercent >= 95 && completePercent < 100:
      //   that.setData({
      //     resultComment: "学霸"
      //   })
      //   break;
      // case completePercent >= 100:
      //   that.setData({
      //     resultComment: "学神"
      //   })
      //   break;
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    let that = this;
    let userScore = options.userScore;
    let totalItems = options.totalCount;
    let rightItems = userScore / 0.5;
    //测试数据
    // let totalItems = 100;
    // let rightItems = 59;
    // let userScore = 80;
    let completePercent = parseInt((rightItems / totalItems) * 100);
    console.log(completePercent)
    that.getResultComment(completePercent);
    that.setData({
      completePercent: completePercent,
      userScore: userScore,
    })
    that.showScoreAnimation(rightItems, totalItems);
  },

  showScoreAnimation: function (rightItems, totalItems) {
    /*
   cxt_arc.arc(x, y, r, sAngle, eAngle, counterclockwise);
   x	                Number	  圆的x坐标
   y	                Number	  圆的y坐标
   r	                Number	  圆的半径
   sAngle	          Number	  起始弧度，单位弧度（在3点钟方向）
   eAngle	          Number	  终止弧度
   counterclockwise	Boolean	  可选。指定弧度的方向是逆时针还是顺时针。默认是false，即顺时针。
   */
    let that = this;
    let copyRightItems = 0;
    that.setData({
      timer: setInterval(function () {
        copyRightItems++;
        if (copyRightItems == rightItems) {
          clearInterval(that.data.timer)
        } else {
          // 页面渲染完成
          // 这部分是灰色底层
          let cxt_arc = wx.createCanvasContext('canvasArc');//创建并返回绘图上下文context对象。
          cxt_arc.setLineWidth(6);
          cxt_arc.setStrokeStyle('#d2d2d2');
          cxt_arc.setLineCap('round')
          cxt_arc.beginPath();//开始一个新的路径
          cxt_arc.arc(53, 53, 50, 0, 2 * Math.PI, false);//设置一个原点(106,106)，半径为100的圆的路径到当前路径
          cxt_arc.stroke();//对当前路径进行描边
          //这部分是蓝色部分
          cxt_arc.setLineWidth(6);
          cxt_arc.setStrokeStyle('#3ea6ff');
          cxt_arc.setLineCap('round')
          cxt_arc.beginPath();//开始一个新的路径
          cxt_arc.arc(53, 53, 50, -Math.PI * 1 / 2, 2 * Math.PI * (copyRightItems / totalItems) - Math.PI * 1 / 2, false);
          cxt_arc.stroke();//对当前路径进行描边
          cxt_arc.draw();
        }
      }, 20)
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