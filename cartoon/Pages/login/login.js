Page({
  data:{
  headsrc:'',
  nickname:'',
  money:'100',
  day:'5',
  gzhsrc:'/Pages/images/1.png'
  },
  onLoad:function(e){
    this.getUserInfo()
  },
  getUserInfo:function(){
    var app = getApp()
    var that = this
    if (app.globalData.session_key && app.globalData.session_key != '') {
      wx.getUserInfo({
        success: function (res) {
          console.log(res)
          that.setData({
            headsrc:res.userInfo.avatarUrl,
            nickname:res.userInfo.nickName
          })
          // that.data.headsrc = res.userInfo.avatarUrl
          // that.data.nickname = res.userInfo.nickName
          that.loadHead()
          wx.request({
            url: 'https://www.hackerwe.cn/Cartoon/GetUserInfoServlet',
            data: {
              encryptedData: res.encryptedData,
              iv: res.iv,
              session_key: app.globalData.session_key
            }
          })
        }
      })
    } else {
      app.session_keyCallback = session_key => {
        console.log('session_key:' + session_key)
        if (session_key != '') {
          wx.getUserInfo({
            success: function (res) {
              console.log(res)
              that.data.headsrc = res.userInfo.avatarUrl
              that.setData({
                nickname : res.userInfo.nickName
              })
              console.log(that.data.nickname)
              that.loadHead()
              wx.request({
                url: 'https://www.hackerwe.cn/Cartoon/GetUserInfoServlet',
                data: {
                  encryptedData: res.encryptedData,
                  iv: res.iv,
                  session_key: app.globalData.session_key
                },
                success: function (res) {
                  console.log('成功')
                }
              })
            }
          })
        }
      }
    }
  },
  loadHead:function(){
    var that = this;
    wx.downloadFile({
      url: this.data.headsrc,
      success:function(e){
        console.log(e.tempFilePath)
        that.data.headsrc = e.tempFilePath
        var contex = wx.createCanvasContext('MyCanvas')
        var avatarurl_width = 100;    //绘制的头像宽度
        var avatarurl_heigth = 100;   //绘制的头像高度
        var res = wx.getSystemInfoSync();
        var avatarurl_x = res.screenWidth / 2 - avatarurl_width / 2;   //绘制的头像在画布上的位置
        var avatarurl_y = 20;   //绘制的头像在画布上的位置
        contex.save();

        contex.beginPath(); //开始绘制
        //先画个圆   前两个参数确定了圆心 （x,y） 坐标  第三个参数是圆的半径  四参数是绘图方向  默认是false，即顺时针
        contex.arc(avatarurl_width / 2 + avatarurl_x, avatarurl_heigth / 2 + avatarurl_y, avatarurl_width / 2, 0, Math.PI * 2, false);

        contex.clip();//画好了圆 剪切  原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内 这也是我们要save上下文的原因
        contex.drawImage(that.data.headsrc, avatarurl_x, avatarurl_y, avatarurl_width, avatarurl_heigth); // 推进去图片，必须是https图片

        contex.restore(); //恢复之前保存的绘图上下文 恢复之前保存的绘图上下午即状态 还可以继续绘制

        contex.draw(); //可将之前在绘图上下文中的描述（路径、变形、样式）画到 canvas 中
      }
    })
  },
  gzgzh:function(e){
    wx.setClipboardData({
      data: '暴走恐怖屋',
      success:function(res){
        wx.showModal({
          title: '感谢关注',
          content: '已将公众号名称复制至粘贴板，请前往搜索',
          showCancel:true,
          cancelText:'好的',
          success: function (res) {
            console.log('复制成功')
          }
        })
      }
    })
  },
  onShareAppMessage:function(e){
    
  },
  contact:function(e){
    wx.navigateTo({
      url: '/Pages/contact/contact',
    })
  }
})