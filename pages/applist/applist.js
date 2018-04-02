//applist.js
//获取应用实例
const app = getApp()

Page({
  data: {
    uid: null,
    appList: null
  },
  onLoad: function () {
    console.log(app.globalData.uid)
    var that = this;
    this.setData({
			uid: app.globalData.uid
		});
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: 'https://www.znnkee.com/smallprogram/index.php/Home/UserApi/order_list',
      method: "POST",
      data: {
        "uid" : app.globalData.uid
      },
      success: function(res) {
        console.log(res);
        if(res.data.status != 200) {
          wx.showModal({
            title: '获取失败',
            showCancel: false
          });
        }else {
          that.setData({
            appList: res.data.info.list
          });
          if(that.data.appList.length==0){
            wx.showModal({
              content: '暂无小程序，请购买',
              showCancel: false,
              success: function(sRes) {
                if (sRes.confirm) {
                  wx.navigateBack({
                    delta: 1
                  })
                }
              }
            });
          }
        }
      },
      fail: function(err){
        console.log(err);
      }
    });
  },
  clickItem: function(e){ 
    var that = this;
    if(e.currentTarget.dataset.name!=null){
      wx.navigateTo({
        url: '../checkmsg/checkmsg?orderId='+e.currentTarget.dataset.orderid
      })
    }else{
      wx.navigateTo({
        url: '../sendmsg/sendmsg?orderId='+e.currentTarget.dataset.orderid+'&needSet=0'
      })
    }
  }
})

  