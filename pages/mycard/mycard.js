//mycard.js
const app = getApp()

Page({
  data: {
    cardData: [
      
    ],
    shadeHide: 1,
    confirmHide: 1,
    successHide: 1,
    delId: null,
    delIndex: null
  },
  onLoad: function () {
    console.log(123)
    wx.showLoading({
      mask: true,
    })
    var that = this;
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: 'https://www.znnkee.com/smallprogram/index.php/Home/UserApi/my_bank_list',
      method: "POST",
      data: {
        uid: app.globalData.uid,
        page: 1
      },
      success: function(res) {
        that.setData({
          cardData: res.data.info.list
        });
        wx.hideLoading()
      },
      fail: function(err){
        console.log(err);
      }
    })
  },
  onShow:function(){
    this.onLoad();
  },
  clickclose: function(e){
    var that = this;
    console.log(e.currentTarget.dataset.delindex,6666)
    console.log(that.data.cardData,453454)
    that.setData({
      shadeHide: 0,
      confirmHide: 0,
      delId: e.currentTarget.dataset.cardid,
      delIndex: e.currentTarget.dataset.delindex,
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
    wx.showLoading({
      title: '读取中',
      mask: true,
    })
    var that = this;
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: 'https://www.znnkee.com/smallprogram/index.php/Home/UserApi/my_bank_del',
      method: "POST",
      data: {
        uid: app.globalData.uid,
        bankid: that.data.delId
      },
      success: function(res) {
        if(res.data.status != 200) {
          wx.showModal({
            title: res.data.msg,
            showCancel: false
          });
          that.setData({
            confirmHide: 1,
          });
        }else {
          that.data.cardData.splice(that.data.cardData.delIndex, 1);
          that.setData({
            successHide: 0,
            confirmHide: 1,
            cardData: that.data.cardData
          });
        }
        wx.hideLoading()
      },
      fail: function(err){
        console.log(err);
      }
    })
  },
  clickSuccess: function(e){
    var that = this;
    if(that.data.successHide==0){
      that.setData({
        successHide: 1,
        shadeHide: 1
      });
    }
  },
  addcard: function(e){
    wx.navigateTo({
      url: '../addcard/addcard'
    })
  }
})
