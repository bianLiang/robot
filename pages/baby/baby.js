// miniprogram/pages/baby/baby.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {studentName:'龙半斤',sex:'男',age:'5岁 2个月 12天'}
    ]
  },
  goEditBaby(event) {
    wx.navigateTo({
      url: '/pages/editBaby/editBaby?index='+event.currentTarget.dataset.num+'',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    wx.getStorage({
      key: 'userData',
      success (res) {
        console.log(res.data)
        that.setData({
          list: res.data.studentList
        })
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