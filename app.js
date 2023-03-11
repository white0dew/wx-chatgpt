require('./common/runtime.js')
require('./common/vendor.js')
require('./common/main.js')

/**
  * 全局分享配置，页面无需开启分享
  * 使用隐式页面函数进行页面分享配置
  * 使用隐式路由获取当前页面路由，并根据路由来进行全局分享、自定义分享
  */
 ! function () {
  //获取页面配置并进行页面分享配置
  var PageTmp = Page
  Page = function (pageConfig) {
    //1. 获取当前页面路由
    let routerUrl = ""
    wx.onAppRoute(function (res) {
      let pages = getCurrentPages(),
        view = pages[pages.length - 1];
      routerUrl = view.route
    })

    //2. 全局开启分享配置
    pageConfig = Object.assign({
      onShareAppMessage: function () {
        //分享给朋友
        //根据不同路由设置不同分享内容（微信小程序分享自带参数，如非特例，不需配置分享路径）
        let shareInfo={}
        let noGlobalSharePages=[""]
        //全局分享配置，如部分页面需要页面默认分享或自定义分享可以单独判断处理
        if (!routerUrl.includes(noGlobalSharePages)){
          shareInfo = {
            title: "你好，主人",
            imageUrl:"./static/icon1.jpg"
          }
        }
        return shareInfo
      },
      onShareTimeline: function () {
        //分享至朋友圈
        let shareInfo={}
        let noGlobalSharePages=[""]
        if (!routerUrl.includes(noGlobalSharePages)){
          shareInfo = {
            title: "你好，主人",
            imageUrl: "./static/icon1.jpg"
          }
        }
        return shareInfo
      }
    }, pageConfig);
    // 配置页面模板
    PageTmp(pageConfig);
  }
}();