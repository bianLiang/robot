// pages/common/toptips.js
Component({
  /**
   * 组件的属性列表
   */
  options: { 
    multipleSlots: true // 在组件定义时的选项中启用多slot支持 
  }, 
  properties: {
    content:{ type: String, value: '' }, 
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow: false,
    time:2000
  },
  

  /**
   * 组件的方法列表
   */
  methods: {
    show() {
      const that = this;
      that.setData({
        isShow:true
      });
      setTimeout(()=> {
        that.setData({
          isShow:false
        });
      },that.data.time);
  
    },
  }
})
