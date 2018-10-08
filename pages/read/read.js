// pages/read/read.js
const db = wx.cloud.database()
var util = require('../../utils/util.js');
var app = getApp()
var id, open_id
var voice = new Array()
const recorderManager = wx.getRecorderManager()
const options = {
  duration: 600000,
  sampleRate: 16000,
  numberOfChannels: 1,
  encodeBitRate: 96000,
  format: 'mp3',
  frameSize: 1000
}
const innerAudioContext = wx.createInnerAudioContext()

Page({
  record: function() {
    recorderManager.start(options)
    recorderManager.onStart(() => {
      console.log('recorder start')
    })
    recorderManager.onError((res) => {
      console.log('error')
      console.log(res)
    })
    recorderManager.onFrameRecorded((res) => {
      console.log('frameBuffer', res)
    })
    this.setData({
      recording: true
    })
  },

  pause: function() {
    recorderManager.pause()
    recorderManager.onPause(() => {
      console.log('recorder pause')
    })
    this.setData({
      paused: true
    })
  },

  resume: function() {
    recorderManager.resume()
    this.setData({
      paused: false
    })
  },

  stop: function() {
    var substring = open_id + util.formatTime(new Date()) + ".mp3"
    recorderManager.stop()
    recorderManager.onStop((stopres) => {
      console.log('recorder stop', stopres)
      var duration = stopres.duration
      wx.cloud.uploadFile({
        cloudPath: substring,
        filePath: stopres.tempFilePath,
        success: uploadres => {
          voice.push(uploadres.fileID)
          console.log(voice)
          this.setData({
            recording: false
          })
        }
      })
    })
  },

  play: function() {
    if (voice.length == 0) {
      wx.showToast({
        title: "貌似没有录进去哦，请再试一次吧",
        icon: 'none'
      })
    } else {
      for (var v in voice) {
        innerAudioContext.src = voice[v]
        console.log(innerAudioContext.src)
        innerAudioContext.play()
      }
    }
    this.setData({
      playing: true
    })
    innerAudioContext.onEnded(() => {
      that.setData({
        playing: false
      })
    })
  },

  stopplay: function() {
    innerAudioContext.stop()
    this.setData({
      playing: false
    })
  },

  upload: function() {
    this.setData({
      disabled: true,
      loading: true
    })
    wx.showLoading({
      title: "上传中……"
    })
    this.update(voice);
    wx.navigateTo({
      url: "../friends/friends?id=" + app.getReadingItem().no
    })
  },

  update: function(file) {
    db.collection('audios').add({
      data: {
        audioID: file,
        readerID: open_id,
        readerName: app.getUserInfo().account_name,
        readType: id,
        readTitle: app.getReadingItem().title,
        readText: app.getReadingItem().text,
        readAuthor: app.getReadingItem().author,
        readNo: app.getReadingItem().no,
        likes: 0,
        comments: [],
        time: db.serverDate()
      },
      success: function(res) {
        console.log(res)
      }
    })
    if (id == "1") {
      app.addTask()
      app.setDate()
    }
    app.addTime()
  },

  data: {
    paused: false,
    recording: false,
    disabled: false,
    loading: false,
    playing: false
  },

  onLoad: function(options) {
    id = options.id
    open_id = app.getUserInfo().openid
  },


  onReady: function() {

  },

  onShow: function() {
    this.setData({
      title: app.getReadingItem().title,
      author: app.getReadingItem().author,
      text: app.getReadingItem().text,
    })

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