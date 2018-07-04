// pages/canvas/canvas.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: true,
    // user_id: '',
    // real_name: '',
    // id_card: '',
    // school_id:''
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

        
        that.setData({
          user_id: user_id,
          real_name: real_name,
          id_card: id_card,
          school_id: school_id,
          
        })
      }
    })

    let promise1 = new Promise(function (resolve, reject) {
      wx.getImageInfo({
        src: '../../images/chengjidanBG.png',
        success: function (res) {
          console.log(res)
          resolve(res);
        }
      })
    });
    let promise2 = new Promise(function (resolve, reject) {
      wx.getImageInfo({
        src: '../../images/chengjidan2.jpg',
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
      ctx.drawImage('../../' + res[0].path, 0, 0, 355, 520)
      ctx.drawImage('../../' + res[1].path, 50, 60, 270, 155)
      

      ctx.setTextAlign('center')
      ctx.setFillStyle('#9a8576')
      ctx.setFontSize(22)
      ctx.fillText(real_name, 355 / 2, 260)

      ctx.setTextAlign('left')
      ctx.setFillStyle('#304d64')
      ctx.setFontSize(14)
      ctx.fillText('身份证号码：' + id_card ,50, 330)
      ctx.fillText('培训学校：' + school_id, 50, 360)
      ctx.fillText('成绩评定：' , 50, 390)

      ctx.stroke()
      ctx.draw()
    })
  },

  saveAlbun: function () {//点击保存到相册
    //获取相册授权
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              console.log('授权成功')
            }
          })
        }
      }
    })
  },

  /**
   * 生成分享图
  */
  share: function () {
    var that = this
    wx.showLoading({
      title: '努力生成中...'
    })
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 545,
      height: 771,
      destWidth: 545,
      destHeight: 771,
      canvasId: 'shareImg',
      success: function (res) {
        console.log(res.tempFilePath);
        that.setData({
          prurl: res.tempFilePath,
          hidden: false
        })
        wx.hideLoading()
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },

  /**
   * 保存到相册
  */
  save: function () {
    var that = this

    //生产环境时 记得这里要加入获取相册授权的代码


    wx.saveImageToPhotosAlbum({
      filePath: that.data.prurl,
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

  }
})