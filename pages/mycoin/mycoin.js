//mycoin.js
const app = getApp()

Page({
  data: {
    cashData: [],
    coinNum: 0
  },
  onLoad: function () {
    var that = this;
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: 'https://www.znnkee.com/smallprogram/index.php/Home/UserApi/my_gold',
      method: "POST",
      data: {
        uid: app.globalData.uid
      },
      success: function(res) {
        that.setData({
          coinNum: res.data.gold
        });
      },
      fail: function(err){
        console.log(err);
      }
    })
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: 'https://www.znnkee.com/smallprogram/index.php/Home/UserApi/my_gold_list',
      method: "POST",
      data: {
        uid: app.globalData.uid,
        page: 1
      },
      success: function(res) {
        that.setData({
          cashData: res.data.info.list
        });
      },
      fail: function(err){
        console.log(err);
      }
    })
  },
  mycard: function(e){
    wx.navigateTo({
      url: '../mycard/mycard'
    })
    // wx.showModal({
    //   content: '自2018年2月10号起，平台提现功能暂停使用，3月1日恢复使用。期间并不影响金币的累积。',
    //   showCancel: false
    // });
  },
  cash: function(e){
    if(this.data.coinNum>0){
      wx.navigateTo({
        url: '../getcash/getcash'
      })
    }else{
      wx.showModal({
        content: '金币大于0才可提现',
        showCancel: false
      });
    }
  }
})
