//Invitecode.js
//获取应用实例
const app = getApp()

Page({
  data: {
    code: ''
  },
  onLoad: function () {
    var that = this;
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: 'https://www.znnkee.com/smallprogram/index.php/Home/UserApi/my_icode',
      method: "POST",
      data: {
        "uid" : app.globalData.uid
      },
      success: function(res) {
        console.log(res);
        if(res.data.status != 200) {
          wx.showModal({
            title: res.data.msg,
            showCancel: false
          });
        }else {
          if(res.data.i_code==''||res.data.i_code.length!=6){
            wx.showModal({
              content: '暂无邀请码，购买商品后即可获得',
              showCancel: false,
              success: function(sRes) {
                if (sRes.confirm) {
                  wx.navigateBack({
                    delta: 1
                  })
                }
              }
            });
          }else{
            that.setData({
              code: res.data.i_code
            });
          }
        }
      },
      fail: function(err){
        console.log(err);
      }
    });
  }
})
