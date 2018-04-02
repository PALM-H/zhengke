//index.js

Page({
  data: {
    imgUrls: [

    ],
    advert: '',
    name: '',
    phone: '',
    address: '',
    latitude: '',
    longitude: '',
  },
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      mask: true,
    })
    wx.request({
      url: 'https://www.znnkee.com/smallprogram/index.php/Home/StoreApi/store_info',
      method: "GET",
      success: function(res) {
        that.setData({
          imgUrls: res.data.info.imgs,
          advert: res.data.info.store_banner,
          name: res.data.info.name,
          phone: res.data.info.phone,
          address: res.data.info.address,
          latitude: res.data.info.latitude,
          longitude: res.data.info.longitude,
        });
        wx.hideLoading()
      },
      fail: function(err){
        console.log(err);
      }
    })
  },
  callphone: function(e){
    var that = this;
    wx.makePhoneCall({  
      phoneNumber: that.data.phone
    })  
  },
  clickToMap: function(e){
    var that = this;
    wx.openLocation({
      latitude: parseFloat(that.data.latitude),
      longitude: parseFloat(that.data.longitude),
      scale: 28,
      name: that.data.name,
      address: that.data.address
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
