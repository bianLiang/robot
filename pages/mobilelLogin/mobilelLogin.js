// miniprogram/pages/mobilelLogin/mobilelLogin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:'',
    switch1Checked:true,
    code:'获取验证码',
    isCode:false,
    phone:'',
    codeNumder:'',
    error:'',
    oneButton: [{text: '我知道了'}],
    showOneButtonDialog: false,
  },
  // 发送验证码
  sendCode() {
    const that = this;
    if (!that.data.isCode && that.data.phone !== '') {
      let index = 60;
      that.setData({
        isCode:true
      });
      const time = setInterval(()=> {
        if(index !== 0) {
          index--
          that.setData({
            code:index + 's后获取'
          })
        } else {
          clearInterval(time)
          that.setData({
            code:'获取验证码',
            isCode:false
          })
        }
        
      },1000)
      wx.request({
        url: 'http://yosee.mingcloud.net/yms/wx/send/V1?phone='+that.data.phone+'&open_id='+that.data.appid+'',
        method: 'POST',
        success: function(res) {
          console.log(res.data)
        }
      })
    } else {
      this.setData({
          error: '手机号码不能为空'
      })
    }
    
  },
  // 提交表单
  submit() {
    const that = this;
    wx.request({
      url: 'http://yosee.mingcloud.net/yms/wx/bind/V1?app_id=wx05704d42988e616e&phone='+that.data.phone+'&open_id='+that.data.openid+'&code='+that.data.codeNumder+'',
      method: 'POST',
      success: function(res) {
        if (res.data.code == 200) {
          console.log()
          // 保存登录信息
          wx.setStorage({
            key: 'userInfo',
            data: res.data.data
          })
          that.getUserInfo(res.data.data.userid)
        } else {
          // 提示添加到系统提示
          this.setData({
              showOneButtonDialog: true
          });
        }
      },
    })
    // if (!this.data.phone) {
    //     this.setData({
    //       error: '手机号码不能为空'
    //   })
    // } else {
    //   if (!this.data.codeNumder) {
    //       this.setData({
    //         error: '验证码不能为空'
    //     })
    //   } else {
    //     console.log('验证成功提交')
        
        
        
    //   }
    // }
    
  },
  // 获取用户详细信息
  getUserInfo(userid) {
    wx.request({
      url: 'http://yosee.mingcloud.net/yms/user/info',
      method: 'GET',
      data:{userId:userid},
      success: function(res) {
        console.log(res.data.data.privilege)
        wx.switchTab({
          url: '/index/index2'
        })
        
      }
    })
  },
  tapDialogButton() {
      this.setData({
        showOneButtonDialog: false
    })
  },
  onChange(e) {
    this.setData({
      [e.currentTarget.dataset.prop]: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    const that = this;
    wx.getStorage({
      key: 'openid',
      success (res) {
        that.setData({
          openid:res.data
        })
        console.log(that.data.appid)
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