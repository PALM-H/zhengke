//mine.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: null
  },
  onLoad: function () {



    console.log(app.globalData.userInfo)
    if(!app.globalData.hasGetUserInfo){
      this.setData({
        userInfo: app.globalData.userInfo
      });
    }else{
      app.login();
      this.setData({
        userInfo: app.globalData.userInfo
      });
    }
  },
  tabClick1: function(e) {
    wx.navigateTo({
      url: '../applist/applist'
    })
  },
  tabClick2: function(e) {
    wx.navigateTo({
      url: '../mycoin/mycoin'
    })
  },
  tabClick3: function(e) {
    wx.navigateTo({
      url: '../Invitecode/Invitecode'
    })
  },
  tabClick4: function(e) {
    wx.makePhoneCall({  
      phoneNumber: '02038889989'  
    })  
  },
  tabClick5: function(e) {
    wx.navigateTo({
      url: '../course/course'
    })
  },
  tabClick6: function(e) {
    wx.navigateTo({
      url: '../cashexp/cashexp'
    })
  },
  onShareAppMessage: function () {
    return {
      title: '挣客3C行业平台服务商',
      imageUrl: '/images/share.jpg',
      path: '/pages/index/index'
    }
  }
})
