// miniprogram/pages/login/login.js
// const WXBizDataCrypt = require('../js/WXBizDataCrypt')
const RdWXBizDataCrypt = require('../js/WXBizDataCrypt')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select: 0,
    show: false,
    access_key:'',
    openid:'',
    showOneButtonDialog: false,
    oneButton: [{text: '我知道了'}],
  },
  open: function () {
    this.setData({
      show: true
    })
  },
  refuse() {
    this.setData({
      show: false
    })
  },
  allow() {
    // 这里调登录接口
  },
  goAddPhone() {
    wx.navigateTo({
      url: '/pages/addphone/addphone',
    })
  },
  selectBtn(event) {
    this.setData({
      select: event.currentTarget.dataset.num
    });
    
  },
  // 去微信登录
  weChartLogin() {
    // this.setData({
    //   show: true
    // })
  },
  // 去手机号登录
  phoneLogin() {
    wx.navigateTo({
      url: '/pages/mobilelLogin/mobilelLogin',
    })
  },
  onGotUserInfo: function (e) {
    if (e.detail.userInfo) {
      //console.log("授权了");
      wx.getUserInfo({ //授权后可以通过wx.getUserInfo得到用户信息
        lang: "zh_CN",
        success: res => {
          //如果用户点击了授权，可以直接获取到信息
          console.log(res.userInfo)
          wx.setStorageSync("userinfo", res.userInfo); //将用户信息保存到缓存中
        }
      })
    }

  },
  tapDialogButton() {
      this.setData({
        showOneButtonDialog: false
    })
  },
  getPhoneNumber(e) {
    const that = this;
    // console.log(this.data.access_key)
    wx.getStorage({
      key: 'access_key',
      success (res) {
        console.log(res)
        that.setData({
          access_key:res.data
        })
        console.log(that.data.access_key,'执行哈哈哈哈')
        if(e.detail.iv) {
          console.log(e.detail.errMsg)
          console.log(e.detail.iv)
          console.log(e.detail.encryptedData)
          var appId = 'wx05704d42988e616e'
          var sessionKey = that.data.access_key
          var encryptedData = e.detail.encryptedData
          var iv = e.detail.iv
          const pc = new RdWXBizDataCrypt(appId, sessionKey);
          const data = pc.decryptData(encryptedData, iv);
          console.log('解密后 data: ', data)
          wx.request({
            url: 'http://yosee.mingcloud.net/yms/wx/bind/V2?app_id=wx05704d42988e616e&phone='+data.phoneNumber+'&open_id='+that.data.openid+'',
            method: 'POST',
            success: function(res) {
              console.log(res.data.data)
              if (res.data.code == 200) {
                // 保存登录信息
                wx.setStorage({
                  key: 'userInfo',
                  data: res.data.data
                })
                that.getUserInfo(res.data.data.userid)
    
              } else {
                // 提示添加到系统提示
                that.setData({
                    showOneButtonDialog: true
                });
              }
            },
          })
        }
      }
    })
    
  },
  // 获取用户详细信息
  getUserInfo(userid) {
    wx.request({
      url: 'http://yosee.mingcloud.net/yms/user/info',
      method: 'GET',
      data:{userId:userid},
      success: function(res) {
        console.log(res.data.data.privilege)
        // wx.setStorage({
        //   key: 'role',
        //   data: res.data.data.privilege
        // })
        // if (res.data.data.privilege === 'f-1') {
        //   wx.navigateTo({
        //     url: '/pages/role/role',
        //   })
        // } else {
        //   wx.switchTab({
        //     url: '/index/index2',
        //   })
        // }
        wx.switchTab({
          url: '/index/index2'
        })
        
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    wx.login({
      success: function(data) {
        console.log(data);
        var that = this;
        console.log(data.code)
         // 获取access_token
        wx.request({
          url:  'http://yosee.mingcloud.net/yms/wx/mini/access/V1',
          method: 'GET',
          success: function(res) {
            // console.log(res.data)
            wx.setStorage({
              key: 'access_token',
              data: res.data
            })
          }
        })
         // 获取access_key获取用户的open_id
        wx.request({
          url:  'http://yosee.mingcloud.net/yms/wx/mini/session/V1',
          data: {code: data.code},
          method: 'GET',
          success: function(res) {
            console.log(res.data.data.session_key)
            console.log('openid',res.data.data.openid)
            wx.setStorage({
              key: 'access_key',
              data: res.data.data.session_key
            })
              wx.setStorage({
              key: 'openid',
              data: res.data.data.openid
            })
          }
        })
      }
    })
    wx.getStorage({
      key: 'openid',
      success (res) {
        that.setData({
          openid:res.data
        })
        console.log(res.data)
        console.log(that.data.openid)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})