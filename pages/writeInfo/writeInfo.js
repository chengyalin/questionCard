// pages/writeInfo/writeInfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabledState:true,
    NameValue: '',
    IdCardtValue: '',
    slectedValue:'',
    slectedArray: [],

    placeHolder:true,
  },


  bindinputName: function (e) {//取用户名的value
    let that = this;
    let NameValue = e.detail.value;
    that.setData({
      NameValue: NameValue//通过bindinput事件获取用户输入的value，并保存至data中
    })
    that.changeSureBtnColor()
  },
  bindinputIdCard: function (e) {//取身份证的value
    let that = this;
    let IdCardtValue = e.detail.value;
    that.setData({
      IdCardtValue: IdCardtValue
    })
    that.changeSureBtnColor()
  },

  bindPickerChange: function (e) {//获取学校名称
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    let that = this;
    let placeHolder = that.data.placeHolder;
      that.setData({
        slectedValue: e.detail.value,
        placeHolder: false
      })
    that.changeSureBtnColor()
  },

  changeSureBtnColor: function () {
    // 如果input的姓名和省份证填写了，按钮就变蓝
    let that = this;
    let disabledState = that.data.disabledState
    let NameValue = that.data.NameValue;
    let IdCardtValue = that.data.IdCardtValue;
    let slectedValue = that.data.slectedValue;


    if (NameValue != '' && IdCardtValue != '' && slectedValue != '') {
      disabledState = false;
      that.setData({
        disabledState: disabledState,
        NameValue: NameValue,
        IdCardtValue: IdCardtValue,
        slectedValue: slectedValue
      })
    } else {
      disabledState = true;
    }
  },

  // 选择学校的接口
  getSlectedArray: function () {
    let that = this;

    wx.request({
      url: app.baseUrl + '/user/school/list/', 
      data: {

      },
      header: {
        'content-type': 'application/json' // 默认值
      }, 
      success: function (res) {
        console.log(res.data)
        let datas = res.data.data;
        let slectedArray = that.data.slectedArray;
        for (let i = 0; i < datas.length; i++){
          slectedArray[i] = datas[i].title; //数组里面的每一项title进行遍历
        }
        that.setData({ slectedArray: slectedArray})
      }
    })
  },
  /**
  * 页面的跳转生成成绩单
  */
  jumpToMyScoreCard: function (e) {
    let that = this;
   
    let user_id = 1; //假的数据
    let real_name = that.data.NameValue;
    let id_card = that.data.IdCardtValue;
    let school_id = that.data.slectedValue;

    console.log('user_id' + user_id)
    console.log('real_name' + real_name)
    console.log('id_card' + id_card)
    console.log('school_id' + school_id)

    wx.navigateTo({
      url: '../myScoreCard/myScoreCard?user_id=' + user_id + '&school_id=' + school_id + '&real_name=' + real_name + '&id_card=' + id_card,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.changeSureBtnColor();
    that.getSlectedArray();
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