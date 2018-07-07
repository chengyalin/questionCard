// pages/canvas/canvas.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: true,
    resultComment:'',
    saveImgHandleHidden: false,
    openSettingHidden: true
  },
  onShareAppMessage: function (ops) {//分享给好友
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    return {
      title: '答题卡小程序',
      path: '/myScoreCard/myScoreCard',
      imageUrl:'',
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that =this;
     //生成成绩单的方法
    let user_id = options.user_id;
    let real_name = options.real_name;
    let id_card = options.id_card;
    let school_id = options.school_id;
    let resultComment = that.data.resultComment;
    let winWidth = wx.getSystemInfoSync().windowWidth;//获取屏幕宽
    let winHeight = wx.getSystemInfoSync().windowHeight;//获取屏幕高
    console.log("winHeight:" + winHeight)
    console.log("winWidth:" + winWidth)
    wx.request({
      url: app.baseUrl + '/user/report/create/',
      data: {
        user_id:user_id,
        real_name: real_name,
        id_card:id_card,
        school_id:school_id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        console.log(res.data.data)
        let datas = res.data.data;
        let avg = parseFloat(datas.avg).toFixed(2);
        console.log('avg:' +avg)
        switch (true) {
          case avg < 60:
            that.setData({
              resultComment: "不及格"
            })
            break;
          case avg >= 60 && avg < 80:
            that.setData({
              resultComment: "及格"
            })
            break;
          case avg >= 80 && avg < 100:
            that.setData({
              resultComment: "优秀"
            })
            break;
        }
        console.log("resultComment:" + that.data.resultComment)
        that.setData({
          user_id: user_id,
          real_name: real_name,
          id_card: id_card,
          school_id: school_id,
          winWidth: winWidth,
          winHeight: winHeight
        })
        that.convasSaveImage(real_name, id_card, school_id);//坑，当时成绩获取不到，这行千万别放错位置
      }
    })
  },

  convasSaveImage: function (real_name, id_card, school_id){
    let that = this;
    //绘制canvas图
    let promise1 = new Promise(function (resolve, reject) {
      wx.getImageInfo({
        src: '../../images/chengjidanBG.png',//背景路径
        success: function (res) {
          console.log(res)
          resolve(res);
        }
      })
    });
    let promise2 = new Promise(function (resolve, reject) {
      wx.getImageInfo({
        src: '../../images/chengjidan2.jpg',//标题路径
        success: function (res) {
          console.log(res)
          resolve(res);
        }
      })
    });
    Promise.all([
      promise1, promise2
    ]).then(res => {
      console.log(res)
      const ctx = wx.createCanvasContext('shareImg')

      //主要就是计算好各个图文的位置
      ctx.drawImage('../../' + res[0].path, 0, 0, that.data.winWidth, that.data.winHeight-70)//背景x0，y0，，with等于屏幕高；height等于屏幕高建按钮高
      ctx.drawImage('../../' + res[1].path, (that.data.winWidth/2 - 120), 50, 240, 150)//标题

      ctx.setTextAlign('center')
      ctx.setFillStyle('#9a8576')
      ctx.setFontSize(22)
      ctx.fillText(real_name, (that.data.winWidth) / 2, ((that.data.winHeight) / 2)-30)

      ctx.setTextAlign('left')
      ctx.setFillStyle('#304d64')
      ctx.setFontSize(14)
      console.log("resultComment:" + that.data.resultComment)
      ctx.fillText('身份证号码：' + id_card, 50, ((that.data.winHeight) / 2) + 20)
      ctx.fillText('培训学校：' + school_id, 50, ((that.data.winHeight) / 2) + 50)
      ctx.fillText('成绩评定：' + that.data.resultComment, 50, ((that.data.winHeight) / 2) + 80)

      ctx.stroke()
      ctx.draw()
    })
  },


  /**
   * 保存到相册
  */
  save: function () {
    var that = this;
    //获取相册授权
    that.authorize()
    // that.savaImageToPhoto();
  },

  authorize: function(){
    let that = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              that.savaImageToPhoto();
            },
            fail(){
              that.setData({
                saveImgHandleHidden: true,
                openSettingHidden: false
              }) 
            }
          })
        } else {
          that.savaImageToPhoto();
        }
      },
    })
  },

  handleSetting: function(e){
    let that = this;
    if (!e.detail.authSetting['scope.writePhotosAlbum']) {
      wx.showModal({
        title: '警告',
        content: '若不打开授权，则无法将图片保存在相册中！',
        showCancel: false
      })
      that.setData({
        saveImgHandleHidden: true,
        openSettingHidden: false
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '您已授权，赶紧将图片保存在相册中吧！',
        showCancel: false
      })
      that.setData({
        saveImgHandleHidden: false,
        openSettingHidden: true
      })
    }
  },

  savaImageToPhoto: function(){
    let that = this;
    wx.showLoading({
      title: '努力生成中...'
    })
    wx.canvasToTempFilePath({
      x:0,
      y: 0,
      width: that.data.winWidth,//屏幕宽
      height: that.data.winHeight - 70,//屏幕高-按钮高
      destWidth: that.data.winWidth,
      destHeight: that.data.winHeight - 70,
      canvasId: 'shareImg',
      success: function (res) {
        wx.hideLoading()
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            wx.showModal({
              content: '图片已保存到相册了',
              showCancel: false,
              confirmText: '朕知道啦',
              confirmColor: '#72B9C3',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定');
                  that.setData({
                    hidden: true
                  })
                }
              }
            })
          }
        })
      },
    })
  },
})