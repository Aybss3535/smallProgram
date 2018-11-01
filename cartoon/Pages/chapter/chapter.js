Page({
  data:{
    chapterList:'',
    bookName:'',
    maxid:''
  },
  onLoad:function(e){
    var that = this
    wx.setNavigationBarTitle({
      title: e.bookName,
    })
    this.setData({
      bookName:e.bookName
    })
    wx.request({
      url: 'https://www.hackerwe.cn/Cartoon/ChapterServlet',
      method: "GET",
      data:{
        id:e.id,
        name:e.name
      },
      success:function(res){
        wx.setStorage({
          key: 'chapterList',
          data: res.data,
        })
        that.setData({
          chapterList:res.data,
          maxid:res.data.length
        })
      }
    })
  },
  onShareAppMessage:function(e){
    
  },
  detail:function(e){
    console.log(e)
    wx.navigateTo({
      url: '/Pages/cartoon/cartoon'+'?bookName='+this.data.bookName+'&id='+
      e.target.id+'&chapterName='+e.target.dataset.chaptername+'&maxid='+this.data.maxid,
    })
  }
})