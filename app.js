//app.js
var util = require('utils/util.js');
App({
  onLaunch: function () {
    wx.cloud.init({})
  },
  setUserInfo: function (userInfo) {
    var that = this;
    that.globalData.userInfo = userInfo;
  },
  getUserInfo: function () {
    var that = this;
    return that.globalData.userInfo;
  },
  setReadingItem: function(item) {
    var that = this;
    that.globalData.readingItem = item;
  },
  getReadingItem: function() {
    var that = this;
    return that.globalData.readingItem;
  },
  addTask: function () {
    var that = this;
    var id = that.globalData.userInfo.id;
    const db = wx.cloud.database();
    that.globalData.userInfo.tasks += 1;
    db.collection('accounts').doc(id).update({
      data: {
        tasks: db.command.inc(1)
      }
    })
  },

  setDate: function () {
    var that = this;
    var id = that.globalData.userInfo.id;
    const db = wx.cloud.database();
    var date = util.getDate(new Date())
    that.globalData.userInfo.last_time = date;
    db.collection('accounts').doc(id).update({
      data: {
        lastTime: date
      }
    })
  },

  addTime: function () {
    var that = this;
    var id = that.globalData.userInfo.id;
    const db = wx.cloud.database();
    that.globalData.userInfo.times += 1;
    db.collection('accounts').doc(id).update({
      data: {
        times: db.command.inc(1),
      }
    })
  },

  globalData: {
    userInfo: null,
    readingItem: {
      title: "无题",
      text: "无文本",
      author: "",
      no: 0
    }
  }

})