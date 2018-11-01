Page({
  data:{
    cartoonList:'',
    id:'',
    maxid:'',
    bookName:'',
    chapterList:''
  },
  onLoad:function(e){
    var that = this
    wx.getStorage({
      key: 'chapterList',
      success: function(res) {
        that.setData({
          chapterList:res.data
        })
      },
    })
    console.log(e)
    wx.setNavigationBarTitle({
      title: e.chapterName,
    })
    this.setData({
      bookName: e.bookName, 
      id:e.id,
      maxid:e.maxid
    })
    wx.request({
      url: 'https://www.hackerwe.cn/Cartoon/CartoonServlet',
      method: "GET",
      data:{
        bookName: e.bookName, 
        id:e.id
      },
      success:function(res){
        console.log(res)
        that.setData({
          cartoonList:res.data
        })
      }
    })
  },
  prechapter:function(e){
    var that = this
    this.setData({
      id:parseInt(this.data.id)-1
    })
    wx.setNavigationBarTitle({
      title: this.data.chapterList[this.data.id-1].name,
    })
    wx.request({
      url: 'https://www.hackerwe.cn/Cartoon/CartoonServlet',
      method: "GET",
      data:{
        bookName: this.data.bookName,
        id: this.data.id
      },
      success:function(res){
        that.setData({
          cartoonList: res.data
        })
        console.log(res)
      }
    })
    wx.pageScrollTo({
      scrollTop: 0,
    })
  },
  nextchapter: function (e) {
    var that = this
    this.setData({
      id: parseInt(this.data.id)+1
    })
    wx.setNavigationBarTitle({
      title: this.data.chapterList[this.data.id - 1].name,
    })
    wx.request({
      url: 'https://www.hackerwe.cn/Cartoon/CartoonServlet',
      method: "GET",
      data: {
        bookName: this.data.bookName,
        id: this.data.id
      },
      success: function (res) {
        that.setData({
          cartoonList: res.data
        })
        console.log(res)
      }
    })
    wx.pageScrollTo({
      scrollTop: 0,
    })
  },
  onShareAppMessage:function(e){
    
  }
})