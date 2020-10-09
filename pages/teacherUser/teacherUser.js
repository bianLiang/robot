// miniprogram/pages/teacherUser/teacherUser.js
Component({
  properties:{
    userData:{
      type:Object,
      value:{}
    }
  },
  methods:{
    goLogin(){
      wx.navigateTo({
        url: '/pages/login/login',
      })
    },
    goBaby() {
      
      wx.navigateTo({
        url: '/pages/baby/baby',
      })
    },
    goEditPersonal() {
      wx.navigateTo({
        url: '/pages/editPersonal/editPersonal',
      })
    },
    goEditCard() {
      wx.navigateTo({
        url: '/pages/editCard/editCard',
      })
    },
    goSwitchGarden() {
      wx.navigateTo({
        url: '/pages/switchGarden/switchGarden',
      })
    },
    goRole() {
      wx.navigateTo({
        url: '/pages/role/role',
      })
    },
    goLogin() {
      wx.clearStorageSync()
      wx.navigateTo({
        url: '/pages/login/login',
      })
    },
  }
})