const db = wx.cloud.database()
var app = getApp()
var util = require('../../utils/util.js');


Page({

  tapTaskItem: function (e) {
    var that = this
    var readingItem = {}
    db.collection('tasks').where({
      _id: e.currentTarget.id
    }).get({
      success: function (res) {
        readingItem = {
          title: res.data[0].title,
          text: res.data[0].text,
          no: res.data[0].no,
          author: res.data[0].author
        }
        app.setReadingItem(readingItem);
        wx.navigateTo({
          url: "../read/read?id=1"
        }) 
      }
    })
  },

  data: {
    taskList: [],
  },
  
  onLoad: function (options) {
  },
  
  load: function() {
    var last_time = app.getUserInfo().last_time
    var date = util.getDate(new Date())
    this.setData({
      unlockedTasks: app.getUserInfo().tasks,
    })
    if (last_time == date) {
      this.setData({
        canUnlock: false
      })
    } else {
      this.setData({
        canUnlock: true
      })
    }
    var that = this;
    db.collection('tasks').orderBy('no', 'asc').get({
      success: function (res) {
        that.setData({
          taskList: res.data,
        })
      }
    });
  },

  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.load();
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
    this.load();
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