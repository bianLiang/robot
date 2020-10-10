const api = require('../pages/js/api')
Component({
  data: {
    userInfo:'',
    privilege:'',
    userData:''
  },
  pageLifetimes: {
    show() {
      // console.log('qiehuan')
      
      this.getUserInfo()
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 1
        })
      }
    }
  },
  methods:{
    // 获取用户详细信息
  getUserInfo() {
    const that = this;
    wx.getStorage({
      key: 'userInfo',
      success (res) {
        that.setData({
          userInfo:res.data
        })
        wx.request({
          url: api+ '/yms/user/info',
          method: 'GET',
          data:{userId:that.data.userInfo.userid},
          success: function(res) {
            console.log(res.data.code)
            if(res.data.code === 200) {
              that.setData({
                privilege:res.data.data.privilege,
                userData:res.data.data
              })
              wx.setStorage({
                key: 'userData',
                data: res.data.data
              })
            } else {
              wx.navigateTo({
                url: '/pages/login/login',
              })
            }
            
          }
        })    
      }
    })
    
  },
  },
  lifetimes: {
    created() {
      // this.getUserInfo()
    },
    ready() {
      
    }
  }
})
