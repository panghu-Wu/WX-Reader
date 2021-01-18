Page({

  /**
   * 页面的初始数据
   */
  /*data: {
    selected: [],
  },*/
  
  data: {
    calShow: true, // 日历组件是否打开
    dateShow: false, // 日期是否选择
    selectDay: '', // 当前选择日期
    canlender: {
      "weeks": []
    }
  },
  ready() {
    this.getWeek(new Date())
    if (this.data.isOpen) {
      this.setData({
        calShow: false,
        dateShow: true
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
  },
  bindViewTap: function() {
    wx.navigateTo({
      url: '../write/write'
    })
  },
  /*
  newPage: function() {
    this.onLoad();
  },*/
  //下拉刷新
    //下拉刷新
  onPullDownRefresh:function(){
      console.log("刷新"); 
   
      wx.setNavigationBarTitle({
        title: '刷新中……'
      })//动态设置当前页面的标题。
      wx.showNavigationBarLoading();//在当前页面显示导航条加载动画。
      this.onLoad();//重新加载
      wx.hideNavigationBarLoading();//隐藏导航条加载动画。
      wx.stopPullDownRefresh();//停止当前页面下拉刷新。
      console.log("关闭");
      
      
      wx.setNavigationBarTitle({
        title: '小日历冲冲冲'
      })//动态设置当前页面的标题。
      
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //接收日期
    var onedate = wx.getStorageSync('selectdate');
    var oneyear = wx.getStorageSync('selectyear');
    var onemonth = wx.getStorageSync('selectmonth');
    console.log(onemonth);

    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('usertxt').where({
      _openid: this.data.openid,
      date: onedate,
      month: onemonth,
      year:oneyear
    }).get({
      success: res => {
        //以对象的形式存储时需要先转换格式，JSON.stringify()
        var data = JSON.stringify(res.data);
        //将数据缓存
        wx.setStorageSync("datalocal", data);
        //取本地缓存
        var newLocal = wx.getStorageSync("datalocal");
        // 取到本地缓存时需要先判断缓存是否存在，如果不增加数据判断直接调用  JSON.parse() 方法时，当数据 newLocal 为空或者不存在时，  JSON.parse()  方法将报错
        if (newLocal != "" && newLocal != undefined) {
          var jsonData = JSON.parse(newLocal);
          //console.log("输出："+jsonData["0"]["auther"])
        }
        
        this.setData({
          dailytitle: jsonData["0"]["titlecontent"],
          dailycontent: jsonData["0"]["txtcontent"],
          imgURL: jsonData["0"]["imgURL"]
        })
        console.log('[数据库] [查询记录] 成功: ', res)
        return
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
        return
      }
    })
    this.setData({
          dailytitle: "你还没记录今天的故事呢~",
          dailycontent: "按下加号开始记录吧~",
          imgURL: '../../images/null.jpg'
        })
  },
  /**
  * 日历是否被打开
  */
  bindselect(e) {
    console.log(e.detail.ischeck)
  },
  /**
   * 获取选择日期
   */
  bindgetdate(e) {
    let time = e.detail;
    console.log(time)

  }
})