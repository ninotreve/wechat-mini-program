const db = wx.cloud.database()
const innerAudioContext = wx.createInnerAudioContext()
var app = getApp()
var id, file

Page({
  play: function() {
    for (var i in file) {
      wx.cloud.downloadFile({
        fileID: file[i],
        success: res => {
          innerAudioContext.src = res.tempFilePath
          innerAudioContext.play()
          console.log(res.tempFilePath)
          that.setData({
            playing: true
          })
        },
        fail: console.error
      })
    }
    innerAudioContext.onEnded(() => {
      that.setData({
        playing: false
      })
    })
  },

  stop: function() {
    innerAudioContext.stop()
    this.setData({
      playing: false
    })
  },

  remove: function() {
    var that = this;
    wx.showModal({
      title: "删除",
      content: "确认删除？删除后不可恢复，请三思~",
      success: res => {
        if (res.confirm == true) {
          db.collection('audios').doc(e.currentTarget.id).get({
            success: function(res) {
              file[0] = res.data.audioID
              console.log(file)
              wx.cloud.deleteFile({
                fileList: file,
                success: res => {
                  console.log("存储删除")
                  that.load()
                  console.log("重加载完成")
                },
                fail: err => {
                  console.log("存储未删除")
                }
              })
            }
          })
          db.collection('audios').doc(e.currentTarget.id).remove({
            success: res => {
              console.log("数据库删除")
            },
            fail: console.error
          })
        }
      }
    })
  },

  like: function(e) {

  },

  toFriends: function() {
    wx.navigateTo({
      url: '../friends/friends?id=openid'
    })
  },

  data: {
    readerName: "",
    readText: "",
    readTitle: "",
    playing: false,
    canDelete: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    id = options.id
    db.collection('audios').doc(id).get({
      success: function(res) {
        console.log(res.data)
        file = res.data.audioID
        that.setData({
          readerName: res.data.readerName,
          time: res.data.time,
          readText: res.data.readText,
          readTitle: res.data.readTitle
        })
        if (res.data._openid == app.getUserInfo().openid) {
          that.setData ({canDelete: true})
        }
      }
    })
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