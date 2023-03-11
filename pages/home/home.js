// pages/home/home.js
Page({

  data: {
    show_input: false,
    code: '',
  },


  onShow: function () {
    // 这里应该做一些初始化的操作

  },
  onShow: function () {
    // 获取缓存，看用户是不是第一次进入
    var isFirst = wx.getStorageSync('is_first');
    if (isFirst) {
      setTimeout(() => {
        console.log("hello World isFirst");
        this.setData({
          show_input: true,
        })
        wx.navigateTo({
          url: '/pages/index/index'
        })
      }, 1000)
    }
  },
  closeModal() {
    this.setData({
      show_input: false
    })
  },
  showCode() {
    this.setData({
      show_input: true,
    })
    //写入缓存
    wx.setStorageSync('is_first', true);
    wx.navigateTo({
      url: '/pages/index/index'
    })
  }
})
