//buy.js
//获取应用实例
const app = getApp()

Page({
  data: {
    uid: null,
    orderId: null,
    itemArr: null,
    choosetype: null,
    choosegid: null,
    invitecode: '',
    agreeHide: 1,
    shadeHide: 1,
    confirmHide: 1,
    codeHide: 1,
    focus: false,
    successHide: 1
  },
  onLoad: function () {
    console.log(app.globalData.uid)
    var that = this;
    if(!app.globalData.hasGetUserInfo){
      this.setData({
        uid: app.globalData.uid
      });
    }else{
      app.login();
      this.setData({
        uid: app.globalData.uid
      });
    }
    wx.request({
      url: 'https://www.znnkee.com/smallprogram/index.php/Home/GoodsApi/goods_list',
      success: function(res) {
        console.log(res);
        if(res.data.code != 200) {
          wx.showModal({
            title: '登录失败',
            showCancel: false
          });
        }else {
          that.setData({
            itemArr: res.data.info.list
          });
        }
      },
      fail: function(err){
        console.log(err);
      }
    });
  },
  clickItem: function(e){ 
    var that = this;
    that.setData({
      choosetype: e.currentTarget.dataset.type,
      choosegid: e.currentTarget.dataset.gid,
      agreeHide: 0,
      shadeHide: 0
    })
  },
  closeAgree: function(){ 
    var that = this;
    that.setData({
      agreeHide:1,
      shadeHide:1
    })
  },
  clickAgree: function(){
    var that = this;
    that.setData({
      agreeHide:1,
      confirmHide:0
    })
  },
  noUseCode: function(){
    var that = this;
    this.wxPay(this.data.uid,this.data.choosegid,this.data.invitecode);
  },
  useCode: function(){
    var that = this;
    that.setData({
      confirmHide:1,
      codeHide:0,
      focus:true
    })
  },
  codeInput: function(e){
    var that = this;
    that.setData({
      invitecode: e.detail.value
    })
  },
  backToSelect: function(){
    var that = this;
    that.setData({
      confirmHide:0,
      codeHide:1
    })
  },
  enterCode: function(){
    var that = this;
    this.wxPay(this.data.uid,this.data.choosegid,this.data.invitecode);
  },
  clickSuccess: function(){
    var that = this;
    that.setData({
      successHide:1,
      shadeHide:1
    })
    wx.navigateTo({
      url: '../buysuccess/buysuccess?type='+that.data.choosetype+'&orderId='+that.data.orderId
    })
  },
  clickShade: function(){
    var that = this;
    if(that.data.successHide==0){
      that.setData({
        successHide:1,
        shadeHide:1
      })
      wx.navigateTo({
        url: '../buysuccess/buysuccess?type='+that.data.choosetype+'&orderId='+that.data.orderId
      })
    }
  },
  getFocus: function() {
    this.setData({
      focus: true
    })
  },
  wxPay: function(uid,gid,icode){
    var that = this;
    wx.showLoading({
      title: '正在支付',
      mask: true,
    })
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: 'https://www.znnkee.com/smallprogram/index.php/Home/OrderApi/pay_order',
      method: "POST",
      data: {
        "uid" : uid,
        "gid" : gid,
        "i_code" : icode
      },
      success: function(res) {
        console.log(res);
        if(res.data.status == 200) {
          wx.requestPayment({
            timeStamp: res.data.payPackage.timeStamp,
            nonceStr: res.data.payPackage.nonceStr,
            package: res.data.payPackage.package,
            signType: "MD5",
            paySign: res.data.payPackage.paySign,
            success: function(payRes){
              wx.hideLoading()
              console.log(payRes)
              console.log(res.data.orderid)
              that.setData({
                orderId: res.data.orderid,
                confirmHide:1,
                successHide:0
              })
            },
            fail: function(err){
              wx.request({
                header: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                url: 'https://www.znnkee.com/smallprogram/index.php/Home/OrderApi/order_del',
                method: "POST",
                data: {
                  "uid" : uid,
                  "orderid" : res.data.orderid
                },
                success: function(sres) {
                  if(sres.data.status == 200) {
                    that.setData({
                      confirmHide:1,
                      shadeHide:1,
                      codeHide:1
                    })
                    wx.hideLoading()
                    wx.showModal({
                      title: '支付失败',
                      showCancel: false
                    });
                  }
                },
                fail: function(ferr){
                  console.log(ferr)  
                }
              })
              
            }
          })
        }else {
          that.setData({
            confirmHide:1,
            shadeHide:1,
            codeHide:1
          })
          wx.showModal({
            title: res.data.msg,
            showCancel: false
          });
        }
      },
      fail: function(err){
        console.log(err);
      }
    });
  },
  onShareAppMessage: function () {
    return {
      title: '挣客3C行业平台服务商',
      imageUrl: '/images/share.jpg',
      path: '/pages/index/index'
    }
  }
})

  