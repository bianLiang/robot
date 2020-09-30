
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
      goEditCard() {
        wx.navigateTo({
          url: '/pages/editCard/editCard',
        })
      },
      goRole() {
        wx.navigateTo({
          url: '/pages/role/role',
        })
      },
      goLogin() {
        wx.navigateTo({
          url: '/pages/login/login',
        })
      },
  }
})