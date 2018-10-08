const db = wx.cloud.database()
const innerAudioContext = wx.createInnerAudioContext()
var app = getApp()
var id

Page({
  detail: function(e){
    wx.navigateTo({
      url: '../audio/audio?id=' + e.currentTarget.id
    })
  },

  load: function(){
    wx.showLoading({
      title: "加载中……",
    })
    var that = this;
    var openid, no;
    var tasks = app.getUserInfo().tasks;

    if (id == "0") {
      no = db.command.lte(tasks)
    } else if (id.length == 1) {
      no = id
      that.setData ({
        headtext:"听听其他老师的第" + no + "关"
      })
    } else if (id == "me") {
      openid = app.getUserInfo().openid;
      that.setData({
        canDelete: true,
        headtext: "我的作品"
      })
    } else {
      openid = id
      db.collection('audios').where({
        _openid: openid
      }).get({
        success: function (res) {
          var readerName = res.data[0].readerName
          that.setData({
            headtext: readerName + "老师的作品"
          })
        }
      })

    }
    db.collection('audios').where({
      _openid: openid,
      readNo: no,
    })
      .orderBy('time', 'desc')
      .get({
        success: function (res) {
          that.setData({
            audioList: res.data,
          })
          console.log(res.data)
        }

      });
    wx.hideLoading();
  },

  data: {
    audioList: [],
    canDelete: false,
    playing: false,
    headtext: "大家都在读"
  },

  onLoad: function (options) {
    id = options.id
    console.log(id)
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
    this.load()
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
    wx.stopPullDownRefresh();
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