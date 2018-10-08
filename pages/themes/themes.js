const db = wx.cloud.database()
var app = getApp()

Page({
  tapResultItem: function (e) {
    var that = this
    var readingId = e.currentTarget.id
    var readingItem = {}
    db.collection('texts').where({
      _id: readingId
    }).get({
      success: function (res) {
        readingItem = {
          title: res.data[0].title,
          text: res.data[0].text,
          author: res.data[0].author,
          no: 0
        }
        app.setReadingItem(readingItem);
        that.toRead()
      }
    })
  },
  
  addText: function() {
    wx.navigateTo({
      url:"../addtext/addtext"
    })
  },

  toRead: function() {
    wx.navigateTo({
      url: "../read/read?id=2"
    })
  },

  data: {
    notFound: false
  },

  formSubmit: function (e, re) {
    var that = this;
    var formData = e.detail.value.id; 
    db.collection('texts').where({
      title: formData
    }).get({
      success: function (res) {

        that.setData({
          re: res.data
        })
        if (res.data.length == 0) {
          that.setData({ notFound: true })
        } else {
          that.setData({ notFound: false })
        }
      }
    })
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