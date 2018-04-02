//news.js

Page({
  data: {
    //tab
		tabs: [],
    tabWidth: 750,
		activeIndex: 0,

    //carousel
    imgUrls: [],//banner
    indicatorDots: false,
    autoplay: true,
    interval: 4000,
    duration: 500,
		swiperCurrent: 0,

    //list
		itemArr: [
			
		]
  },
	onLoad: function () {
    var that = this;
    wx.showLoading({
      mask: true,
    })
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: 'https://www.znnkee.com/smallprogram/index.php/Home/NewsApi/category_list',
      method: "POST",
      data: {
        page: 1
      },
      success: function(res) {
        console.log(res,'345435435435345tabTitle')
        that.setData({
          tabs: res.data.info.list,
          tabWidth: res.data.info.list.length*120+120
        });
				that.getAtcList(0)
      },
      fail: function(err){
        console.log(err);
      }
    })
  },
	//获取分类文章
	getAtcList: function(id){
		var that = this;
		wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: 'https://www.znnkee.com/smallprogram/index.php/Home/NewsApi/article_list',
      method: "POST",
      data: {
        page: 1,
				cid: id
      },
      success: function(res) {
        console.log(res,'3463253425article')
        that.setData({
          itemArr: res.data.info.list,
					imgUrls: res.data.banner_list
        });
        wx.hideLoading()
      },
      fail: function(err){
        console.log(err);
      }
    })
	},
	//navbar点击事件
  tabClick: function(e) {
		wx.showLoading({
      mask: true,
    })
		var that = this;
    this.setData({
			activeIndex: e.currentTarget.id
		});
		if(e.currentTarget.id == 0){
			that.getAtcList(0)
		}else{
			that.getAtcList(that.data.tabs[e.currentTarget.id-1].cid)
		}
  },
	//轮播切换相关
  swiperChange: function(e){  
    this.setData({  
        swiperCurrent: e.detail.current  
    })  
	},
	//文章点击事件
  itemClick: function(e) {
    wx.navigateTo({
      url: '../article/article?id='+e.currentTarget.dataset.id
    })
  },
	onShareAppMessage: function () {
    return {
      title: '挣客3C行业平台服务商',
      imageUrl: '/images/share.jpg',
      path: '/pages/index/index'
    }
  }
});