const db = wx.cloud.database()

Page({

  toRanking: function(e) {
    wx.navigateTo({
      url: '../ranking/ranking?id=' + e.currentTarget.id
    })
  },

  toFriends: function() {
    wx.navigateTo({
      url: '../friends/friends?id=0'
    })
  },

  data: {
    name: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    db.collection('audios').orderBy('time', 'desc').get({
      success: function(res) {
        that.setData({
          name: res.data[0].readerName,
        })
        
      }
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})