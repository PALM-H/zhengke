//addcard.js
const app = getApp()

Page({
  data: {
    uid: null,
    typeArray: ['储蓄卡', '借记卡', '信用卡'],
    index: 0,
    name: '',
    phone: '',
    cardnum: '',
    banktype: '',
    cardtype: '储蓄卡',
  },
  onLoad: function () {
    var that = this;
    this.setData({
      uid: app.globalData.uid
    });
  },
  bindPickerChange: function(e) {
    var that = this;
    this.setData({
      index: e.detail.value,
      cardtype: that.data.typeArray[e.detail.value]
    })
  },
  bindName: function(e){
    var that = this;
    that.setData({
      name: e.detail.value
    })
  },
  bindPhone: function(e){
    var that = this;
    that.setData({
      phone: e.detail.value
    })
  },
  bindBankcard: function(e){
    var that = this;
    that.setData({
      cardnum: e.detail.value
    })
  },
  bindBanktype: function(e){
    var that = this;
    that.setData({
      banktype: e.detail.value
    })
  },
  addcard: function(e){
    var that = this;
    var sendData = {
      uid: that.data.uid,
      householder_name: that.data.name,
      phone: that.data.phone,
      bank_number: that.data.cardnum,
      bank_type: that.data.banktype,
      bank_cartype: that.data.cardtype
    }
    if(sendData.householder_name!=''&&sendData.phone!=''&&sendData.bank_number!=''&&sendData.bank_type!=''){
      if(/^1[0-9]{10}$/.test(sendData.phone)==false){
        wx.showModal({
          title: '手机格式不正确',
          showCancel: false
        });
      }else{
        that.sendMsg(sendData)
      }
    }else{
      wx.showModal({
        title: '请补全所有信息',
        showCancel: false
      });
    }
  },
  sendMsg: function(msgArr){
    var that = this;
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: 'https://www.znnkee.com/smallprogram/index.php/Home/UserApi/my_bank_add',
      method: "POST",
      data: msgArr,
      success: function(res) {
        if(res.data.status == 200){
          wx.showModal({
            content: '添加成功',
            showCancel: false,
            success: function(sRes) {
              if (sRes.confirm) {
                wx.redirectTo({
                  url: '../mycard/mycard'
                })
              }
            }
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
