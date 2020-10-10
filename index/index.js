const api = require('../pages/js/api')
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
          url: api+ '/yms/user/info',
          method: 'GET',
          data:{userId:that.data.userInfo.userid},
          success: function(res) {
            console.log(res.data.data)
            if(res.data.code === 200) {
              that.setData({
                privilege:res.data.data.privilege
              })
              console.log(that.data.privilege)
              console.log(that.data.userInfo.userid)
              
              let t = new Date().getTime();
              if(res.data.data.privilege==='f-1'|| res.data.data.privilege==='j-1' ) {
                that.setData({
                  src:'https://h5.mingcloud.net/attendance-health-xcx/student.html?userid='+that.data.userInfo.userid+'&_qft='+ t +''
                })
              } else {
                that.setData({
                  src:'https://h5.mingcloud.net/attendance-health-xcx/teacher.html?userid='+that.data.userInfo.userid+'&_qft='+ t +''
                })
              }
            } else  {
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
})
