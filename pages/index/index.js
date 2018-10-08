const db = wx.cloud.database()
var re = null
var openid = ""
var util = require('../../utils/util.js');
var app = getApp()

Page({
  taskread: function () {
    wx.navigateTo({
      url: '../taskread/taskread'
    })
  },
  freeread: function () {
    wx.switchTab({
      url: '../themes/themes'
    })
  },
  
  data: {
    
  },

  onLoad: function (options) {
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
    var time = util.getTime(new Date())
    console.log(app.getUserInfo())
    this.setData({
      time_indicator: time,
      account_name: app.getUserInfo().account_name,
      times: app.getUserInfo().times,
      tasks: app.getUserInfo().tasks
    })
    if (time == "早上") {
      this.setData({image: "morning.jpg"})
    } else if (time == "下午") {
      this.setData({ image: "afternoon.jpg" })
    } else {
      this.setData({ image: "evening.jpg" })
    }
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