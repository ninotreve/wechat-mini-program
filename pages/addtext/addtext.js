const db = wx.cloud.database()
var app = getApp()

Page({

  data: {

  },

  formSubmit: function(e) {
    var that = this;
    var readingItem = {}
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    db.collection('texts').add({
      data: {
        no: 0,
        author: e.detail.value.author,
        title: e.detail.value.title,
        text: e.detail.value.text,
      },
      success: function(res) {
        console.log("添加成功")
        wx.showModal({
          title: "添加成功",
          content: "添加成功！是否现在就去录音？（录音文本为刚添加的内容）",
          confirmText: "现在就去",
          cancelText: "继续添加",
          success: res => {
            if (res.confirm == true) {
              readingItem = {
                no: 0,
                author: e.detail.value.author,
                title: e.detail.value.title,
                text: e.detail.value.text,
              }
              app.setReadingItem(readingItem);
              wx.navigateTo({
                url: "../read/read?id=2"
              })
            } else {
              that.formReset()
            }
          }
        })
      }
    })
  },

  formReset: function() {
    console.log('form发生了reset事件')
  },

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