// miniprogram/pages/mobilelLogin/mobilelLogin.js
const api = require('../js/api')
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
    msg:'您暂未被添加到系统，请联系相关管理员'
  },
  // 发送验证码
  sendCode() {
    const that = this;
    console.log(that.data.phone)
    if (!that.data.isCode && that.data.phone !== '') {
      if(!(/^1[3456789]\d{9}$/.test(that.data.phone))){
        this.setData({
          error: '手机号码格式不正确'
        })
      } else {
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
        url: api+'/yms/wx/send/V1?phone='+that.data.phone+'&open_id='+that.data.openid+'',
        method: 'POST',
        success: function(res) {
          console.log(res.data)
        }
      })
      }
      

    } else {
      this.setData({
          error: '手机号码不能为空'
      })
    }
    
  },
  // 提交表单
  submit() {
    const that = this;
    if (!this.data.phone) {
        this.setData({
          error: '手机号码不能为空'
      })
    } else {
      if (!this.data.codeNumder) {
          this.setData({
            error: '验证码不能为空'
        })
      } else {
        console.log('验证成功提交') 
        wx.request({
          url: api+'/yms/wx/bind/V1?app_id=wx05704d42988e616e&phone='+that.data.phone+'&open_id='+that.data.openid+'&code='+that.data.codeNumder+'',
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
              that.setData({
                  showOneButtonDialog: true,
                  msg:res.data.msg
              });
            }
          },
        })
      }
    }
    
  },
  // 获取用户详细信息
  getUserInfo(userid) {
    wx.request({
      url: api+'/yms/user/info',
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
  onChangePhone(e) {
    this.setData({
      phone:e.detail.value
    })
  },
  onChangeCodeNumder(e) {
    this.setData({
      codeNumder:e.detail.value
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
          url:  api+'/yms/wx/mini/access/V1',
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
          url:  api+'/yms/wx/mini/session/V1',
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