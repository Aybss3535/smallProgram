App({
  globalData:{
   session_key:''
  },
  onLaunch:function(e){
    var that=this
    wx.login({
      success:function(res){
        console.log(res)
        wx.request({
          url: 'https://www.hackerwe.cn/Cartoon/LoginServlet',
          data:{
            code:res.code
          },
          success:function(res){
            that.globalData.session_key = res.data.session_key;
            console.log(that.globalData.session_key);
            console.log(res);
            if (that.session_keyCallback) {
              that.session_keyCallback(res.data.session_key);
            }
          }
        })
      }
    })
  }
})
