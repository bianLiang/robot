Component({
  data:{
    privilege:'',
    src:''
  },
  pageLifetimes: {
    show() {
      this.getUserInfo()
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
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
              privilege:res.data.data.privilege
            })
            if(res.data.data.privilege==='f-1'|| res.data.data.privilege==='j-1' ) {
              that.setData({
                src:'http://h5.mingcloud.net/attendance-health-xcx/student.html?userid='+that.data.userInfo.userid+''
              })
            } else {
              that.setData({
                src:'http://h5.mingcloud.net/attendance-health-xcx/teacher.html?userid='+that.data.userInfo.userid+''
              })
            }
          }
        })    
      }
    })
    
  },
  },
})
