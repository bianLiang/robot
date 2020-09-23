Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#43B478",
    list: [{
      pagePath: "/index/index",
      iconPath: "/images/jiankang.png",
      selectedIconPath: "/images/jiankang_s.png",
      text: "健康考勤"
    }, {
      pagePath: "/index/index2",
      iconPath: "/images/user.png",
      selectedIconPath: "/images/user_s.png",
      text: "个人中心"
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})