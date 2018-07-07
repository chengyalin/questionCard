// pages/question/question.js
// pages/myScore/myScore.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    popupBox: false,//最后一题弹出框交卷提示
    selectedAAnswer: false,
    selectedBAnswer: false,
    selectedCAnswer: false,
    selectedDAnswer: false,
    answerAClicked: false,
    answerBClicked: false,
    answerCClicked: false,
    answerDClicked: false,
    collectShow: true,//没有收藏的图显示
    collectShowNo: false,//收藏的图显示
    nextText: '下一题',
    answerStatus: false,
  },


  singleAnswerCheck: function (e) {//单选题，选择abcd其中一个
    let that = this;
    let id = e.target.id;
    console.log(id)
    that.setData({
      nextText: '确定',
      answerStatus: true
    })
    switch (id) {
      case "A":
        that.setData({
          selectedAAnswer: true,
          selectedBAnswer: false,
          selectedCAnswer: false,
          selectedDAnswer: false,
        })
        break;
      case "B":
        that.setData({
          selectedAAnswer: false,
          selectedBAnswer: true,
          selectedCAnswer: false,
          selectedDAnswer: false,
        })
        break;
      case "C":
        that.setData({
          selectedAAnswer: false,
          selectedBAnswer: false,
          selectedCAnswer: true,
          selectedDAnswer: false,
        })
        break;
      case "D":
        that.setData({
          selectedAAnswer: false,
          selectedBAnswer: false,
          selectedCAnswer: false,
          selectedDAnswer: true,
        })
        break;
    }
  },

  multipleAnswerCheck: function (e) {//多选题
    let that = this;
    let id = e.target.id;
    switch (id) {
      case "A":
        let answerAClicked = that.data.answerAClicked;
        if (answerAClicked == false) {
          answerAClicked = true;
          that.setData({
            answerAClicked: answerAClicked,
            selectedAAnswer: true,
          })
        } else {
          answerAClicked = false;
          that.setData({
            answerAClicked: answerAClicked,
            selectedAAnswer: false,
          })
        }
        break;
      case "B":
        let answerBClicked = that.data.answerBClicked;
        if (answerBClicked == false) {
          answerBClicked = true;
          that.setData({
            answerBClicked: answerBClicked,
            selectedBAnswer: true,
          })
        } else {
          answerBClicked = false;
          that.setData({
            answerBClicked: answerBClicked,
            selectedBAnswer: false,
          })
        }
        break;
      case "C":
        let answerCClicked = that.data.answerCClicked;
        if (answerCClicked == false) {
          answerCClicked = true;
          that.setData({
            answerCClicked: answerCClicked,
            selectedCAnswer: true,
          })
        } else {
          answerCClicked = false;
          that.setData({
            answerCClicked: answerCClicked,
            selectedCAnswer: false,
          })
        }
        break;
      case "D":
        let answerDClicked = that.data.answerDClicked;
        if (answerDClicked == false) {
          answerDClicked = true;
          that.setData({
            answerDClicked: answerDClicked,
            selectedDAnswer: true,
          })
        } else {
          answerDClicked = false;
          that.setData({
            answerDClicked: answerDClicked,
            selectedDAnswer: false,
          })
        }
        break;
    }
    // 这里是先拿到每个选项的被选中状态
    let optionClickedStatus = {
      answerAClicked: that.data.answerAClicked,
      answerBClicked: that.data.answerBClicked,
      answerCClicked: that.data.answerCClicked,
      answerDClicked: that.data.answerDClicked,
    };
    // 判断只要四个选项中的任意一个选项被选中，“下一题”变为“确定”
    if (optionClickedStatus.answerAClicked ||
      optionClickedStatus.answerBClicked ||
      optionClickedStatus.answerCClicked ||
      optionClickedStatus.answerDClicked) {
      that.setData({
        nextText: '确定',
        answerStatus: true
      })
    } else {
      that.setData({
        nextText: '下一题',
        answerStatus: false
      })
    }
  },

  popupCancel: function () {//弹窗点击未取消
    this.setData({ popupBox: false })
  },

  // calculateObjAttrLength: function(obj){
  //   let objAttrLength = 0;
  //   for(let i in obj){
  //     objAttrLength++
  //   }
  //   return objAttrLength;
  // },

  jumpToStart: function () {//弹窗点击确认提交
    let that = this;
    let section_id = that.data.section_id;
    //真实user_id
    let user_id= app.globalData.user_id;
    //测试数据
    //let user_id = 1;
    let data = wx.getStorageSync("data");
    // let finishedItems = that.calculateObjAttrLength(data);
    let totalCount = that.data.meta.total_count;
    wx.request({
      url: app.baseUrl + '/bank/question/check/',
      data: {
        data: data,
        user_id: user_id,
        section_id: section_id
      },
      success: function (res) {
        wx.removeStorageSync("questionStatus" + section_id)
        that.setData({ popupBox: false });
        console.log(res.data)
        let userScore = res.data.data;
        wx.navigateTo({
          url: '../answerCardResult/answerCardResult?userScore=' + userScore + '&totalCount=' + totalCount,
        })
      }
    })
  },



  preBtn: function () {//上一题
    let that = this;
    let meta = that.data.meta;
    let prev = meta.prev;
    let section_id = that.data.section_id;
    //let section_id = 3;
    if (prev === null) {
      wx.showToast({
        title: '这已经是第一题了！',
        icon: 'none'
      })
      return;
    } else {
      let url = app.baseUrl + prev;
      that.getQuestionItem(section_id, url)
    }
  },
  nextBtn: function () {//下一题
    let that = this;
    // 点击下一题的时候，收藏状态被置回未收藏的状态
    that.setData({
      collectShow: true,//没有收藏的图显示
      collectShowNo: false,//收藏的图显示
      nextText: '下一题',
      answerStatus: false
    })
    let optionSelectedStatus = {
      selectedAAnswer: that.data.selectedAAnswer,
      selectedBAnswer: that.data.selectedBAnswer,
      selectedCAnswer: that.data.selectedCAnswer,
      selectedDAnswer: that.data.selectedDAnswer,
    }
    let meta = that.data.meta;
    //先取到题目的id和题目是否完成的状态
    let titleNum = meta.page;
    let section_id = that.data.section_id;
    // let section_id = 3;
    if (optionSelectedStatus.selectedAAnswer ||
      optionSelectedStatus.selectedBAnswer ||
      optionSelectedStatus.selectedCAnswer ||
      optionSelectedStatus.selectedDAnswer) {
      let questionStatus = that.data.questionStatus;
      //索引取值为0-149；titleNum取值为1-150
      questionStatus[titleNum - 1] = true;
      //将用户的答题情况存进wx.setStorageSync中，并以section_id区分
      wx.setStorageSync("questionStatus" + section_id, questionStatus)

      that.handleUserSingleAnswer(optionSelectedStatus, titleNum);
    }
    let next = meta.next;
    if (next === null) {
      that.setData({
        popupBox: true
      })
    } else {
      nextText: '下一题'
      let url = app.baseUrl + next;
      that.getQuestionItem(section_id, url)
    }
  },

  handleUserSingleAnswer: function (optionSelectedStatus, titleNum) {
    let that = this;
    let data = wx.getStorageSync("data");
    if (!data) {
      data = {};
    }
    let key = titleNum;
    let value;
    if (optionSelectedStatus.selectedAAnswer) {
      value = "A";
    } else if (optionSelectedStatus.selectedBAnswer) {
      value = "B";
    } else if (optionSelectedStatus.selectedCAnswer) {
      value = "C";
    } else {
      value = "D";
    }
    data[key] = value;
    wx.setStorageSync("data", data);
    console.log("data:" + data);
  },

  /**
  * 页面的跳转答题卡
  */
  jumpToAnswerCard: function () {
    let that = this;
    // let questionStatus = that.data.questionStatus;
    let section_id = that.data.section_id;
    // let section_id = 3;
    wx.navigateTo({
      url: '../answerCard/answerCard?section_id=' + section_id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    let section_id = options.section_id;
    let page = options.page;
    if (page == undefined || page == null || page == '') {
      page = 1;
    }
    //let section_id = 3;
    that.setData({
      section_id: section_id,
    })
    let url = app.baseUrl + '/bank/question/query/?page=' + page;
    that.getQuestionItem(section_id, url);
  },

  getQuestionItem: function (section_id, url) {
    let that = this;
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 500
    })
    wx.request({
      url: url, //接口地址
      data: {
        section_id: section_id,
        // section_id: 3,
        //page: 1
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        let datas = res.data.data;
        let objectList = datas.object_list;
        console.log("用户获取到的题目objectList:" + objectList)
        let meta = datas.meta;
        that.setData({
          meta: meta,
          objectList: objectList
        })
        wx.setStorageSync('metaName',meta)
        for (let i = 0; i < objectList.length; i++) {
          let objList = objectList[i];
          // 测试question_type=2时的数据
          //objList['question_type'] = 2;
          that.setData({
            objList: objList,
          })
        }
        that.isQuestionCollected(meta, objectList, section_id);
        /*
        这里坑大了，因为wx.request是异步请求，在执行请求的时候，js不会继续等待后台响应，
        而是继续执行下面的代码，所以会出现，后面的代码先执行，然后数据才回来的现象，
        所以，这里为了能立刻得到questionStatus的值，所以在success里面利用回调的形式获取
        */
        that.isQuestionFinished(meta, section_id);
      }
    })
  },

  isQuestionFinished: function (meta, section_id) {
    let that = this;
    console.log("section_id:" + section_id)
    /*
    用户初始进入答题界面时，questionStatus是为空的，空的话就先创建一个空的数组;
    如果用户是从答题卡界面跳转过来的，那么就需要用到wx.getStorageSync里的数据，
    因为wx.setStorageSync存的是用户已答题情况
    */
    //后面的section_id是区分不同的section_id而得到对应的答题卡情况
    let questionStatus = wx.getStorageSync("questionStatus" + section_id);
    // console.log("questionStatus:" + questionStatus)
    if (!questionStatus) {
      questionStatus = [];
    }
    let totalPage = meta.total_page;
    for (let i = 0; i < totalPage; i++) {
      //这里是为了保证存进questionStatus的题目数不能超过总题数
      if (questionStatus.length < totalPage) {
        questionStatus.push(false);
      }
    }
    //这里为了保证用户未答题的情况下，点击查看答题情况，这个时候的答题卡选项均未选中
    wx.setStorageSync("questionStatus" + section_id, questionStatus)
    // console.log("questionStatus:" + questionStatus)
    that.setData({
      questionStatus: questionStatus,
      selectedAAnswer: false,
      selectedBAnswer: false,
      selectedCAnswer: false,
      selectedDAnswer: false,
    })
  },

  onCollectionTapOK: function () {//点收藏
    let that = this;
    let question_id = that.data.objList.question_id;
    //真实user_id
    let user_id = app.globalData.user_id;
    //测试数据
    //let user_id = 1;
    let section_id = that.data.section_id;
    that.getCollection(question_id, user_id, section_id)
  },

  onCollectionTapNo: function () {//再点收藏就取消收藏了
    let that = this;
    let question_id = that.data.objList.question_id;
    //真实user_id
    let user_id = app.globalData.user_id;
    //测试数据
    //let user_id = 1;
    let section_id = that.data.section_id;
    that.getCollectionCancel(question_id, user_id, section_id)
  },

  // 收藏题目
  getCollection: function (question_id, user_id, section_id) {
    let that = this;
    let colectionUrl = app.baseUrl + '/bank/bookmark/create/?question_id=' + question_id + '&user_id=' + user_id + '&section_id=' + section_id
    wx.request({
      url: colectionUrl,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        let collectionItems = res.data.data;
        console.log("collectionItems:" + collectionItems)
        let objectList = that.data.objectList;
        that.handleCollection(collectionItems, objectList);
      }
    })
  },

  // 页面刚加载完成时，只能通过该接口获取用户收藏题目
  isQuestionCollected: function (meta, objectList, section_id) {
    let that = this;
    let url = app.baseUrl + '/bank/bookmark/query/';
    //真实user_id
    let user_id = app.globalData.user_id;
    //测试数据
    //let user_id = 1;
    wx.request({
      url: url,
      data: {
        user_id: user_id
      },
      success: function (res) {
        console.log("用户收藏的章节题目：" + res.data.data)
        let collectionQuestions = res.data.data;
        for (let i = 0; i < collectionQuestions.length; i++) {
          let section = collectionQuestions[i].section_id;
          if (section = section_id) {
            let collectionList = collectionQuestions[i].bookmark_list;
            console.log("collectionList:" + collectionList)
            that.handleCollection(collectionList, objectList);
            break;
          }
        }
      }
    })
  },

  handleCollection: function (collectionList, objectList) {
    let that = this;
    let question_id = objectList[0].question_id;
    console.log("question_id:" + question_id)
    for (let i = 0; i < collectionList.length; i++) {
      let collectionItemId = collectionList[i].question_id;
      console.log("collectionItemId:" + collectionItemId)
      if (question_id === collectionItemId) {
        that.setData({
          collectShow: false,//有收藏的图显示
          collectShowNo: true,//没有收藏的图显示
        })
        break;
      } else {
        that.setData({
          collectShow: true,//有收藏的图显示
          collectShowNo: false,//没有收藏的图显示
        })
      }
    }
  },

  // 收藏题目取消
  getCollectionCancel: function (question_id, user_id, section_id) {
    let that = this;
    let colectionUrl = app.baseUrl + '/bank/bookmark/delete/?question_id=' + question_id + '&user_id=' + user_id + '&section_id=' + section_id
    wx.request({
      url: colectionUrl,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        let collectionItems = res.data.data;
        console.log("collectionItems:" + collectionItems)
        let objectList = that.data.objectList;
        that.handleCollection(collectionItems, objectList);
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
