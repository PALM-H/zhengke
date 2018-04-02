//article.js

var WxParse = require('../../wxParse/wxParse.js');

Page({
  data: {
    id: null,
    title: '',
    user: '',
    time: '',
    // content: '',
    logo: '',
    name: '',
    phone: '',
    address: '',
    indicatorDots: false,
    autoplay: true,
    interval: 4000,
    duration: 500,
		swiperCurrent: 0,
    imgUrls: [
      
    ],
  },
  onLoad: function (options) {
    var that = this;
    this.setData({
      id: options.id
    });
    wx.showLoading({
      mask: true,
    })
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: 'https://www.znnkee.com/smallprogram/index.php/Home/NewsApi/info',
      method: "POST",
      data: {
        id: options.id,
        type: 1
      },
      success: function(res) {
        that.setData({
          title: res.data.info.title,
					user: res.data.info.author,
					time: res.data.info.add_time,
					// content: res.data.info.content,
        });
        WxParse.wxParse('article', 'html', res.data.info.content, that, 5);
        wx.hideLoading()
      },
      fail: function(err){
        console.log(err);
      }
    })
    wx.request({
      url: 'https://www.znnkee.com/smallprogram/index.php/Home/NewsApi/article_store',
      method: "GET",
      success: function(res) {
        that.setData({
          logo: res.data.info.logo,
          name: res.data.info.name,
          phone: res.data.info.phone,
          address: res.data.info.address,
        });
      },
      fail: function(err){
        console.log(err);
      }
    })
    wx.request({
      url: 'https://www.znnkee.com/smallprogram/index.php/Home/NewsApi/article_banners',
      method: "GET",
      success: function(res) {
        that.setData({
          imgUrls: res.data.info
        });
      },
      fail: function(err){
        console.log(err);
      }
    })
  },
  //轮播切换相关
  swiperChange: function(e){  
    this.setData({  
      swiperCurrent: e.detail.current  
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
