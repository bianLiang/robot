// miniprogram/pages/role/role.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showOneButtonDialog:false,
    oneButton: [{text: '我知道了'}]
  },
  selectRole(e) {
    if(e.currentTarget.dataset.role === 'parent') {
      wx.switchTab({
        url: '/index/index2',
      })
    }
    if(e.currentTarget.dataset.role === 'teacher') {
      wx.switchTab({
        url: '/index/index2',
      })
    }
    this.setData({
      showOneButtonDialog: true
    })
  },
  tapDialogButton() {
    this.setData({
      showOneButtonDialog: false
    })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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