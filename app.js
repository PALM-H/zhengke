//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    this.login();
  },
  login: function(){
    var that = this;
    //调用登录接口
    //1.小程序调用wx.login得到code.
    wx.login({
      success: function (res) {
        var code = res.code;
        //2.小程序调用wx.getUserInfo得到rawData, signatrue, encryptData.
        wx.getUserInfo({
          withCredentials: true, //是否带上登录态信息
          lang: 'zh_CN', //返回用户信息的语言
          success: function (info) {
            that.globalData.userInfo = info.userInfo;

            // var rawData = info.rawData;
            var signature = info.signature;
            var encryptData = info.encryptData;
            var encryptedData = info.encryptedData;
            var iv = info.iv;

            //3.小程序调用server获取token接口, 传入code, rawData, signature, encryptData.
            wx.request({
              header: {
              "Content-Type": "application/x-www-form-urlencoded"
              },
              url: 'https://www.znnkee.com/smallprogram/index.php/Home/LoginApi/wx_login',
              method: "POST",
              data: {
                "code" : code,
                // "rawData" : rawData,
                "signature" : signature,
                "encrypt_data" : encryptData,
                'iv' : iv,
                'encrypted_data': encryptedData
              },
              success: function(res) {
                console.log(res);
                if(res.data.code != 200) {
                  wx.showModal({
                    title: '登录失败',
                    showCancel: false
                  });
                }else {
                  that.globalData.uid = res.data.userInfo.uid;
                  that.globalData.hasGetUserInfo = true;
                }
              },
              fail: function(err){
                console.log(err);
              }
            });
          }
        });
      }
    });
  },
  globalData: {
    uid: null,
    userInfo: null,
    hasGetUserInfo: false
  }
})