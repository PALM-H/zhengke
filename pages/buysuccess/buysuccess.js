//sendmsgp.js
Page({
  data: {
    imgurl: null,
    price: null,
    toUrl: null,
  },
  onLoad: function (options) {
    this.setData({
      imgurl: '../../images/buy-item-black'+options.type+'.png',
      price: options.type==1? '普通版￥388' : '套餐版￥688',
      toUrl: '../sendmsg/sendmsg?orderId='+options.orderId+'&needSet=0'
    })
  },
  toWriteMsg: function(e){
    var that = this;
    wx.navigateTo({
      url: that.data.toUrl
    })
  }
})
