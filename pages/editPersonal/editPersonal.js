// miniprogram/pages/editPersonal/editPersonal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    phone:'',
    select:'',
    error:'',
  },
  onChange(e) {
    this.setData({
      [e.currentTarget.dataset.prop]: e.detail.value
    })
  },
  // 提交表单
  submit() {
    if (!this.data.name) {
        this.setData({
          error: '姓名不能为空'
      })
    } else {
      if (!this.data.phone) {
          this.setData({
            error: '手机号码不能为空'
        })
      } else {
        console.log('验证成功提交')
        wx.switchTab({
          url: '/index/index2',
        })
      }
    }  
  },
  selectBtn(event) {
    this.setData({
      select: event.currentTarget.dataset.gender
    });
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