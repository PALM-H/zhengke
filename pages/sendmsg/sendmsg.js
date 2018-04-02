//sendmsg.js
const app = getApp()

Page({
  data: {
    uid: null,
    orderId: null,
    orderMsg: null,
    name: '',
    phone: '',
    email: '',
    leadPhone: '',
    address: '',
    count: '',
    password: '',
    rePassword: '',
    idCode: '',
    wechat: '',
    bank: '',
    bankMsg: '',
    licenseImg: '',
    files: [],
    disabled: false,
    hasImg: false,
    needSet: null,
    needShowLicenseImg: false,
    shadeHide:1,
    successHide:1
  },
  onLoad: function (options) {
    var that = this;
    this.setData({
      orderId: options.orderId,
      needSet: options.needSet,
      uid: app.globalData.uid
    });
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: 'https://www.znnkee.com/smallprogram/index.php/Home/OrderApi/order_goods_info',
      method: "POST",
      data: {
        "orderid" : options.orderId
      },
      success: function(res) {
        that.setData({
          orderMsg: res.data.info
        });
        console.log(that.data.orderMsg)
      },
      fail: function(err){
        console.log(err);
      }
    })
    if(options.needSet==1){
      wx.request({
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        url: 'https://www.znnkee.com/smallprogram/index.php/Home/UserApi/order_info',
        method: "POST",
        data: {
          "orderid" : options.orderId
        },
        success: function(res) {
          var resArr = res.data.info
          that.setData({
            name: resArr.true_name,
            phone: resArr.contact_phone,
            email: resArr.email,
            leadPhone: resArr.legal_phone,
            address: resArr.address,
            count: resArr.s_account
          });
          if(resArr.type==2){
            that.setData({
              idCode: resArr.true_name,
              wechat: resArr.contact_phone,
              bank: resArr.email,
              bankMsg: resArr.legal_phone,
              licenseImg: resArr.license_url,
              hasImg: true,
              needShowLicenseImg: true
            });
          }
            
        },
        fail: function(err){
          console.log(err);
        }
      })
    }
  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        wx.showLoading({
          title: '正在上传',
          mask: true,
        })
        var filePath = res.tempFilePaths[0]

        // 上传图片
        wx.uploadFile({
          url: 'https://www.znnkee.com/smallprogram/index.php/Home/PublicApi/formUpload',
          formData: {
            uid: that.data.uid
          },
          filePath: filePath,
          name: 'file',
          success: function(imgres){
            wx.hideLoading()
            imgres = JSON.parse(imgres.data)
            console.log(imgres)
            that.setData({
              licenseImg: imgres.save_img_url,
              hasImg: true,
              files: res.tempFilePaths,
              needShowLicenseImg: false
            })
          },

          fail: function(e) {
            wx.hideLoading()
            wx.showModal({
              title: '上传失败',
              showCancel: false
            });
          }
        })
      }
    })
  },
  previewImage: function(e){
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
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
  bindEmail: function(e){
    var that = this;
    that.setData({
      email: e.detail.value
    })
  },
  bindLeadPhone: function(e){
    var that = this;
    that.setData({
      leadPhone: e.detail.value
    })
  },
  bindAddress: function(e){
    var that = this;
    that.setData({
      address: e.detail.value
    })
  },
  bindCount: function(e){
    var that = this;
    that.setData({
      count: e.detail.value
    })
  },
  bindPassword: function(e){
    var that = this;
    that.setData({
      password: e.detail.value
    })
  },
  bindRePassword: function(e){
    var that = this;
    that.setData({
      rePassword: e.detail.value
    })
  },
  bindIdCode: function(e){
    var that = this;
    that.setData({
      idCode: e.detail.value
    })
  },
  bindWechat: function(e){
    var that = this;
    that.setData({
      wechat: e.detail.value
    })
  },
  bindBank: function(e){
    var that = this;
    that.setData({
      bank: e.detail.value
    })
  },
  bindBankMsg: function(e){
    var that = this;
    that.setData({
      bankMsg: e.detail.value
    })
  },
  submitClick: function(e){
    var that = this;
    var sendData = {
      orderid: that.data.orderId,
      true_name: that.data.name,
      contact_phone: that.data.phone,
      email: that.data.email,
      legal_phone: that.data.leadPhone,
      address: that.data.address,
      s_account: that.data.count,
      s_pw: that.data.password,
      id_number: that.data.idCode,
      wx_number: that.data.wechat,
      bank_number: that.data.bank,
      open_bank_info: that.data.bankMsg,
      license_url: that.data.licenseImg
    }
    if(that.data.orderMsg.type==1){
      if(sendData.true_name!=''&&sendData.contact_phone!=''&&sendData.email!=''&&sendData.legal_phone!=''&&sendData.address!=''&&sendData.s_account!=''&&sendData.s_pw!=''){
        if(/^1[0-9]{10}$/.test(sendData.contact_phone)==false){
          wx.showModal({
            title: '手机格式不正确',
            showCancel: false
          });
        }else if(/^1[0-9]{10}$/.test(sendData.legal_phone)==false){
          wx.showModal({
            title: '手机格式不正确',
            showCancel: false
          });
        }else if(sendData.s_pw!=that.data.rePassword){
          wx.showModal({
            title: '两次密码输入不相同',
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
    }else if(that.data.orderMsg.type==2){
      if(sendData.true_name!=''&&sendData.contact_phone!=''&&sendData.email!=''&&sendData.legal_phone!=''&&sendData.address!=''&&sendData.s_account!=''&&sendData.s_pw!=''&&sendData.id_number!=''&&sendData.wx_number!=''&&sendData.bank_number!=''&&sendData.open_bank_info!=''&&sendData.license_url!=''){
        if(/^1[0-9]{10}$/.test(sendData.contact_phone)==false){
          wx.showModal({
            title: '手机格式不正确',
            showCancel: false
          });
        }else if(/^1[0-9]{10}$/.test(sendData.legal_phone)==false){
          wx.showModal({
            title: '手机格式不正确',
            showCancel: false
          });
        }else if(sendData.s_pw!=that.data.rePassword){
          wx.showModal({
            title: '两次密码输入不相同',
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
    }
    console.log(sendData)
  },
  clickSuccess: function(e){
    wx.switchTab({
      url: '../mine/mine'
    })
  },
  sendMsg: function(msgArr){
    var that = this;
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      url: 'https://www.znnkee.com/smallprogram/index.php/Home/OrderApi/order_info_sub',
      method: "POST",
      data: msgArr,
      success: function(res) {
        console.log(res);
        if(res.data.status == 200){
          that.setData({
            successHide: 0,
            shadeHide: 0
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
