//checkmsg.js
Page({
  data: {
    orderMsg: null,
    shadeHide:1,
    confirmHide:1
  },
  onLoad: function (options) {
    var that = this;
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: 'https://www.znnkee.com/smallprogram/index.php/Home/UserApi/order_info',
      method: "POST",
      data: {
        "orderid" : options.orderId,
      },
      success: function(res) {
        console.log(res);
        if(res.data.status != 200) {
          wx.showModal({
            title: res.data.msg,
            showCancel: false
          });
        }else {
          that.setData({
            orderMsg: res.data.info
          });
        }
      },
      fail: function(err){
        console.log(err);
      }
    });
  },
  submitClick: function(){
    var that = this;
    that.setData({
      shadeHide: 0,
      confirmHide: 0
    });
  },
  clickcancel: function(e){
    var that = this;
    that.setData({
      shadeHide: 1,
      confirmHide: 1
    });
  },
  clicknext: function(e){
    var that = this;
    wx.navigateTo({
      url: '../sendmsg/sendmsg?orderId='+that.data.orderMsg.orderid+'&needSet=1'
    })
  }
})
