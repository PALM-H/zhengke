//getcash.js
const app = getApp()

Page({
  data: {
    uid: null,
    inputVal: '',
    getnum: 0,
    typeArray: [
      '中国银行 储蓄卡 (4957)',
      '中国工商银行 借记卡 (4666)',
      '中国银行 储蓄卡 (4957)'
    ],
    cardArray: [

    ],
    index: 0,
    cash: 0,
    bankid: null,
    shadeHide: 1,
    successHide: 1
  },
  onLoad: function () {
    wx.showLoading({
      title: '读取中',
      mask: true,
    })
    var that = this;
    this.setData({
      uid: app.globalData.uid
    });
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
          cash: res.data.gold
        });
        wx.hideLoading()
      },
      fail: function(err){
        console.log(err);
      }
    })
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
        if(res.data.info.list.length>0){
          var tArray = [];
          var obj = res.data.info.list;
          for (var key in obj) {
            var item = obj[key].bank_type+" "+obj[key].bank_cartype+" ("+obj[key].bank_number_last_four+")";
            tArray.push(item)
          }
          that.setData({
            cardArray: res.data.info.list,
            typeArray: tArray,
            bankid: res.data.info.list[0].id
          });
        }else{
          wx.showModal({
            content: '暂无可提现银行卡，请添加后再提现',
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
      },
      fail: function(err){
        console.log(err);
      }
    })
  },
  bindNum: function(e){
    var that = this;
    that.setData({
      getnum: e.detail.value
    })
  },
  getcash: function(e){
    var that = this;
    if(that.data.getnum!=0&&that.data.getnum!=''){
      if(that.data.getnum<=parseFloat(that.data.cash)){
        var sendData = {
          uid: that.data.uid,
          bankid: that.data.cardArray[that.data.index].id,
          money: that.data.getnum
        }
        that.sendMsg(sendData)
      }else{
        wx.showModal({
          content: '提现金额不能大于现有金额！',
          showCancel: false,
        });
      }
    }else{
      wx.showModal({
        content: '请输入提现金额',
        showCancel: false,
      });
    }
  },
  getAll: function(e){
    var that = this;
    that.setData({
      inputVal: that.data.cash,
      getnum: that.data.cash
    });
  },
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
  },
  clickSuccess: function(e){
    var that = this;
    if(that.data.successHide==0){
      wx.redirectTo({
        url: '../mycoin/mycoin'
      })
    }
  },
  sendMsg: function(msgArr){
    var that = this;
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: 'https://www.znnkee.com/smallprogram/index.php/Home/UserApi/withdrawals',
      method: "POST",
      data: msgArr,
      success: function(res) {
        if(res.data.status == 200){
          that.setData({
            shadeHide: 0,
            successHide: 0
          });
        }else{
          wx.showModal({
            title: res.data.msg,
            showCancel: false
          });
        }
      },
      fail: function(err){
        console.log(err);
      }
    })
  }
})
