// miniprogram/pages/editCard/editCard.js
const cwx = require('../js/profunc.js'); //在小程序页面引入该js 文件
Page({

  /**
   * 页面的初始数据
   */
  data: {
    access_token:'',
    type:'',
    sequence:'',
    error:''
  },
  onChange(e) {
    this.setData({
      [e.currentTarget.dataset.prop]: e.detail.value
    })
  },
  // 提交表单
  submit() {
    if (!this.data.sequence) {
        this.setData({
          error: '序列号不能为空'
      })
      // 这里可以调用自定义组件
      this.toptips.show();
    } else {
      console.log('验证成功提交')
    }  
  },
  selectBtn(event) {
    this.setData({
      type: event.currentTarget.dataset.type
    });
  },
// 识别身份证
ocridcard() {
    const that = this
    cwx.OcrIdCard(that.data.access_token).then(function(_res){
      var trdata = _res.data.words_result;
      console.log(trdata)
      that.setData({
        name: trdata['姓名'].words,
        idcard: trdata['公民身份号码'].words,
        userloc: trdata['住址'].words
      })
  })      
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // const serverUrl = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=refresh_token&appid=wx05704d42988e616e&secret=159ea6862c587873d986a5d474fa7a54';
    // wx.request({
    //       url: serverUrl,
    //       method: 'GET',
    //       dataType: 'json',
    //       success: function (res) {
    //         console.log('data : ', res.data)
    //       },
    //       fail: function (res) { },
    //       complete: function (res) { },
    //     })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.toptips = this.selectComponent("#toptips"); 
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