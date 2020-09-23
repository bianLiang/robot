// miniprogram/pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    select: 0,
    show: false
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
    this.setData({
      show: true
    })
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
  getPhoneNumber(e) {
    // 这里需要进行后台解密获取手机号
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.login({
      success: function (res) {
        console.log(res);
        let code = res.code;
      }
    });
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