const db = wx.cloud.database()
var app = getApp()
var openid

Page({

  newAccount: function(e) {
    var that = this;
    var formData = e.detail.value.id;
    db.collection('accounts').where({
      accountName: formData
    }).get({
      success: function(res) {
        console.log(res.data)
        if (res.data.length != 0) {
          that.setData({
            error_message: "这个名字已经被使用了，换个名字吧"
          })
        } else if (formData == "") {
          that.setData({
            error_message: "名字不符合要求"
          })
        } else if (formData.length > 7) {
          that.setData({
            error_message: "名字太长啦，请控制在7个字以内"
          })
        } else {
          db.collection('accounts').add({
            data: {
              times: 0,
              tasks: 0,
              accountName: formData,
              lastTime: "",
            },
            success: function(res) {
              that.toIndex();
            }
          })
        }
      },
    })
  },


  data: {
    has_account: false,
    userInfo: {},
    account_name: "",
    error_message: "",
    disabled: true
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
    /* 获取用户的openID */
    var that = this
    wx.showToast({
      title: '加载中……',
      icon: 'loading',
      duration: 5000
    });
    wx.cloud.callFunction({
      name: 'getInfo',
      complete: res => {
        var openid = res.result.openId
        db.collection('accounts').where({
          _openid: openid
        }).get({
          success: function(res) {
            if (res.data.length != 0) {
              that.setData({
                has_account: true,
                account_name: res.data[0].accountName
              })
            }
            wx.hideToast();
            that.setData({
              disabled: false
            })
          }
        })
      }
    })


  },

  toIndex: function() {
    var userInfo = {}
    var that = this
    wx.showToast({
      title: '加载中……',
      icon: 'loading',
      duration: 5000
    });
    /* 保存到globalData */
    wx.cloud.callFunction({
      name: 'getInfo',
      complete: res => {
        var openid = res.result.openId
        db.collection('accounts').where({
          _openid: openid
        }).get({
          success: function(res) {
            userInfo = {
              account_name: res.data[0].accountName,
              id: res.data[0]._id,
              openid: res.data[0]._openid,
              times: res.data[0].times,
              tasks: res.data[0].tasks,
              last_time: res.data[0].lastTime,
            }
            wx.setStorage({
              key: "utoken",
              data: res.data.utoken
            });
            app.setUserInfo(userInfo);
            wx.hideToast();
            wx.switchTab({
              url: "../index/index"
            });
          }
        })
      }
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