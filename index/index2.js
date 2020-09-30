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
          url: 'http://yosee.mingcloud.net/yms/user/info',
          method: 'GET',
          data:{userId:that.data.userInfo.userid},
          success: function(res) {
            that.setData({
              privilege:res.data.data.privilege,
              userData:res.data.data
            })
            wx.setStorage({
              key: 'userData',
              data: res.data.data
            })
            console.log(that.data.userData,'父组件')
            // that.user = that.selectComponent('user');
            // that.user.getUserInfo();
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
