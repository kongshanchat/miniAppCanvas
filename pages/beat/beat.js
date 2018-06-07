// pages/beat/beat.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['2/4', '3/4', '4/4', '3/8', '6/8'],
    rhytm:60,
    objectArray: [
      {
        id: 0,
        beat: '2/4'
      },
      {
        id: 1,
        beat: '3/4'
      },
      {
        id: 2,
        beat: '4/4'
      },
      {
        id: 3,
        beat: '3/8'
      },
      {
        id: 4,
        beat: '6/8'
      }
    ],
    index: 0,
    play:false
  },
  // 播放音频
  audioPlay: function (key) {
    var objStop = {};

    // 微信迷之设计
    // 必须先停止
    objStop[key] = {
      method: 'setCurrentTime',
      data: 0
    }
    this.setData(objStop);

    // 再播放
    var objStart = {};
    objStart[key] = {
      method: 'play'
    }
    this.setData(objStart);
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  moveBar: function () {
    var self = this;
    var hasChange = false;

  },
  startHandle:function(){
    var self = this;
    if (this.data.play) {
      self.setData({
        play: false
      })
      return;
    }
    
    self.audioPlay('strongAction');
    self.setData({
      play: true
    })

  },
  add:function(){
    var rhytm = this.data.rhytm;
    rhytm++;
    //console.log(rhytm);
    this.setData({
      rhytm: rhytm
    })
  },
  reduce:function(){
    var rhytm = this.data.rhytm;
    
    if (rhytm>60){
      rhytm--;
    }else{
      wx.showToast({
        title: '频率不能低于60',
        image:'../../images/warn.png'
      })
    }

    this.setData({
      rhytm: rhytm
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
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