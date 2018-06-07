//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
   
  },
  beats:function(){
    wx.navigateTo({
      url: '../beat/beat',
    })
  },
  canvas:function(){
    wx.navigateTo({
      url: '../canvas/canvas',
    })
  },
  onLoad: function () {
    this.getUserInfo();
  },
  getUserInfo: function(e) {
    wx.getUserInfo({
      success: function (res) {
        console(res.userInfo)
      }
    })
    console.log('hahahah')
  }
})
