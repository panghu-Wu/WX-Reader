// miniprogram/pages/head/head.js
Page({
  /** 页面的初始数据 */
  data: {
        bg_img: 'cloud://richang-2gbb4c9c67af1d09.7269-richang-2gbb4c9c67af1d09-1303970356/images/book/back.jpg',//背景图地址，可相对/绝对，可本地/远程
        count: 5,//倒计时秒数
        show_button:false,//初始不显示跳过按钮
  },
  //初始化进入程序
  onLoad() {
        this.countDown();
        this.show_button();
  },
  //延迟一秒显示跳转按钮
  show_button() {
        let that = this
        setTimeout(function() {
              that.setData({
                    show_button: true
              })
        }, 1000)
  },
  //跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
  switchTab() {
        clearInterval(this.data.time); //清除倒计时
        
        wx.navigateTo({
              url: '../bookshelf/bookshelf'
        })
  },
  //倒计时计数
  
  countDown: function() {
        let that = this;
        let count = that.data.count;
        that.data.time = setInterval(function() {
              if (count > 0) {
                    count--
                    that.setData({
                          count: count
                    })
              } else {
                    that.setData({
                          count: count
                    })
                    //that.switchTab();
                    clearInterval(that.data.time)
              }
        }, 1000)
  }, 
})
