// miniprogram/pages/editBaby/editBaby.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    select:'',
    error:'',
    time:'2020-06-01'
  },
  selectBtn(event) {
    this.setData({
      select: event.currentTarget.dataset.gender
    });
    
  },
  //时间选择器：
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  // 提交表单
  submit() {
    if (!this.data.name) {
        this.setData({
          error: '宝宝姓名不能为空'
      })
    } else {
      if (!this.data.time) {
          this.setData({
            error: '出生日期不能为空'
        })
      } else {
        console.log('验证成功提交')
        wx.navigateTo({
          url: '/pages/baby/baby',
        })
      }
    }  
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