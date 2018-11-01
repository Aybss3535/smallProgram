Page({
  data:{
    swiperList:'',
    Array:[1,2,3,4,5,6,7,8,9,10]
  },
  onLoad:function(e){
    var that = this;
    wx.request({
      url: 'https://www.hackerwe.cn/Cartoon/CoverPageServlet',
      method:"GET",
      success:function(res){
        console.log(res);
        that.setData({
          swiperList:res.data.swiperList,
          bookList:res.data.bookList
        })

      }
    })
  },
  onShareAppMessage:function(e){

  },
  detail:function(e){
    console.log(e)
    wx.navigateTo({
      url: '/Pages/chapter/chapter?id='+e.target.id+'&name='+e.target.dataset.name+'&bookName='+e.target.dataset.bookname,
    })  
  }
})