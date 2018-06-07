// pages/canvas/canvas.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    canvasHidden: true,    //设置画板的显示与隐藏，画板不隐藏会影响页面正常显示
    avatarUrl: '../../images/out.png',         //用户头像
    nickName: '阳阳',          //用户昵称
    wxappName: "金港赛车",  //小程序名称
    shareImgPath: '',
    screenWidth: '',       //设备屏幕宽度
    description: "这是一段描述描述描述",    //奖品描述
    FilePath: '',          //头像路径
  },
  saveImageToPhotosAlbum: function () {
    wx.showLoading({
      title: '正在生成中...',
    })
    var that = this;
    //设置画板显示，才能开始绘图
    that.setData({
      canvasHidden: false
    })
    var unit = that.data.screenWidth / 375
    var small = "../../images/small.png"
    var avatarUrl = that.data.avatarUrl
    console.log(avatarUrl + "头像")
    var zhixi = "../../images/zhixi.jpg"
    var path3 = "../../images/stop_bg.png"
    var beat = "../../images/beat_entrance.png"
    var guitar = "../../images/guitar_entrance.png"
    var unlight = "../../images/300.png"
    var nickName = that.data.nickName
    console.log(nickName + "昵称")
    var context = wx.createCanvasContext('share')
    var description = that.data.description
    var wxappName = "来「 " + that.data.wxappName + " 」试试运气"
    //context.drawImage(small, 0, 0, unit * 355, unit * 462.5);
    //context.drawImage(beat, unit * 164, unit * 40, unit * 50, unit * 50)
    context.drawImage(zhixi, unit * 20, unit * 20, unit * 300, unit * 178)
    //context.drawImage(guitar, unit * 48, unit * 120, unit * 280, unit * 178)
    // context.drawImage(unlight, unit * 82, unit * 105, unit * 22, unit * 32)
    // context.drawImage(unlight, unit * 178, unit * 105, unit * 22, unit * 32)
    // context.drawImage(unlight, unit * 274, unit * 105, unit * 22, unit * 32)
    // context.drawImage(unlight, unit * 82, unit * 200, unit * 22, unit * 32)
    // context.drawImage(unlight, unit * 178, unit * 200, unit * 22, unit * 32)
    // context.drawImage(unlight, unit * 274, unit * 200, unit * 22, unit * 32)
    context.drawImage(path3, unit * 20, unit * 240, unit * 40, unit * 40)
    //   context.drawImage(beat, 48, 200, 280, 128)
    context.drawImage(path3, unit * 220, unit * 314, unit * 80, unit * 80)
    context.setFontSize(15)
    context.setFillStyle("#5a5a5a")
    context.fillText("哈哈哈哈哈，这是一篇文章", unit * 20, unit * 224)

    context.setFontSize(14)
    context.setFillStyle("#999")
    context.fillText("长按识别小程序", unit * 70, unit * 254)
    context.setFontSize(12)
    context.fillText(wxappName, unit * 70, unit * 274)

    context.setFontSize(14)
    context.setFillStyle("#a5a5a5")
    context.fillText("我在GTClub中发现了一条", unit * 20, unit * 354)
    context.fillText("有趣的内容快来看看吧！", unit * 20, unit * 334)

    

    //把画板内容绘制成图片，并回调 画板图片路径
    context.draw(false, function () {
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: unit * 375,
        height: unit * 462.5,
        destWidth: unit * 375,
        destHeight: unit * 462.5,
        canvasId: 'share',
        success: function (res) {
          wx.hideLoading();
          that.setData({
            shareImgPath: res.tempFilePath
          })
          if (!res.tempFilePath) {
            wx.showModal({
              title: '提示',
              content: '图片绘制中，请稍后重试',
              showCancel: false
            })
          }
          console.log(that.data.shareImgPath);
          wx.showModal({
            title: '提示',
            content: '保存图片到本地，立即分享到朋友圈吧',
            success:function(data){
              if (data.confirm) {
                //画板路径保存成功后，调用方法吧图片保存到用户相册
                wx.saveImageToPhotosAlbum({
                  filePath: res.tempFilePath,
                  //保存成功失败之后，都要隐藏画板，否则影响界面显示。
                  success: (res) => {
                    console.log(res);
                    wx.showToast({
                      title: '保存成功',
                    })
                    wx.hideLoading()
                    that.setData({
                      canvasHidden: true
                    })
                  },
                  fail: (err) => {
                    console.log(err)
                    wx.hideLoading();
                    wx.showToast({
                      title: '保存失败',
                    })
                    that.setData({
                      canvasHidden: true
                    })
                  }
                })
              } else if (data.cancel) {
                console.log('用户点击取消')
              }
              
            }
          })
          
        }
      })
    });
  },
  closeAlert:function(){
    this.setData({
      canvasHidden: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var userInfo, nickName, avatarUrl
    //获取用户信息，头像，昵称之类的数据
    wx.getUserInfo({
      success: function (res) {
        console.log(res);
        userInfo = res.userInfo
        nickName = userInfo.nickName
        avatarUrl = userInfo.avatarUrl
        that.setData({
          avatarUrl: res.userInfo.avatarUrl,
          nickName: res.userInfo.nickName,
        })
        wx.downloadFile({
          url: res.userInfo.avatarUrl
        })
      }
    })
    

   

    //获取用户设备信息，屏幕宽度
    wx.getSystemInfo({
      success: res => {
        that.setData({
          screenWidth: res.screenWidth
        })
        console.log(that.data.screenWidth)
      }
    })

    //定义的保存图片方法
   
    
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