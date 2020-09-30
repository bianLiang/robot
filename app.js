App({
  onLaunch: function () {
    console.log("页面初始化")
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log(res);
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              // this.globalData.userInfo = res.userInfo
              wx.setStorage({
                key: 'userInfo',
                data: res.userInfo
              })
            }
          })
        } else {
          wx.navigateTo({
            url: '/pages/login/login',
          })
        }
      }
    });
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
   


  }
})
