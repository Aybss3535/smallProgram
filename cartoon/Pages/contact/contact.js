Page({
  copyqq:function(e){
    wx.setClipboardData({
      data: '1330145984',
      success:function(res){
        wx.showToast({
          title: '复制成功',
        })
      }
    })
  },
  copywx: function (e) {
    wx.setClipboardData({
      data: '暴走恐怖屋',
      success: function (res) {
        wx.showToast({
          title: '复制成功',
        })
      }
    })
  }
})