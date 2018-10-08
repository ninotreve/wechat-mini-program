const db = wx.cloud.database()
var util = require('../../utils/util.js');
var app = getApp();
var id;
var order = "times";
Page({
  data: {
    _firstRank: [],
    _mainRank: [],
    isTimes: true
  },

  load: function () {
    var that = this;
    db.collection('accounts').orderBy(order, 'desc').get({
      success: function (res) {
        var ranking = res.data;
        var firstRank = ranking.slice(0, 3);
        var mainRank = ranking.slice(3);
        that.setData({
          _firstRank: firstRank,
          _mainRank: mainRank
        })
      }
    });
  },

  onShow: function () {
    this.load();
  },

  onLoad: function (options) {
    id = options.id
    if (id == "1") {
      this.setData({ isTimes: false })
      order = "tasks"
    }
  },

  //下拉刷新
  onPullDownRefresh: function () {
    var that = this;
    wx.showNavigationBarLoading();
    that.load();
    wx.stopPullDownRefresh();
  },

});
