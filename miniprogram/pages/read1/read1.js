// miniprogram/pages/read1/read1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ne: [],
    scrollTop: null,
    bg_color: "#fff",
    bg_choice: "关灯",
    color: "#000000",
    font_size: 40,
    select: false,
    chapter_rank: 0,
    book_name: "",
    topNum: 0,
  },
  //增大字体
  magnifFontSize(){
    this.setData({
      font_size: this.data.font_size+5,
      select:!this.data.select
    })
  },
  //减小字体
  shrinkFontSize(){
    this.setData({
      font_size: this.data.font_size-5,
      select:!this.data.select
    })
  },

  //选择框是否出现
  bindShowMsg() {
    this.setData({
        select:!this.data.select
    })
  },
  //开灯和关灯
  bindBackground(){
    if(this.data.bg_choice=="关灯"){
      this.setData({
        bg_color: "#000000",
        color: "#fff",
        bg_choice: "开灯",
      })
    }
    else{
      this.setData({
        bg_color: "#fff",
        color: "#000000",
        bg_choice: "关灯",
      })
    }
  },
  //滚动条监听
  scroll: function (e) {
    this.setData({ scrollTop: e.detail.scrollTop })
  },
  //返回顶端
  returnTop: function () {
    this.setData({
      topNum: this.data.topNum = 0
    });
  },

  //前往目录页 错
  gotoCatalogPage(){
    wx.navigateBack({
      delta: 1
    });
  },
  //上一章
  
  gotoLastPage(e){
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('chapter').where({
      book: e.target.dataset.book_name,
      rank: e.target.dataset.chapter_rank-1,
      //book: this.data.book_name,
      //rank: this.data.chapter_rank+1,
    }).get({
      success: res => {
        console.log(res.data)
        if(res.data==null){
          wx.showToast({
            icon: 'none',
            title: '已经是第一章了！'
          })
          gotoCatalogPage()
        }
        else{
          this.setData({
            //content: jsonData["0"]["content"]
            chapter: res.data[0]
          })
          this.returnTop()
        }
      },
      fail: err => {
        console.error('[数据库] [查询记录] 失败：', err)
        return
      }
    })
  },
  //下一章
  gotoNextPage(e){
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('chapter').where({
      book: e.target.dataset.book_name,
      rank: e.target.dataset.chapter_rank+1,
      //book: this.data.book_name,
      //rank: this.data.chapter_rank+1,
    }).get({
      success: res => {
        console.log(res.data)
        if(res.data==null){
          wx.showToast({
            icon: 'none',
            title: '已经是最后一章了！'
          })
          gotoCatalogPage()
        }
        else{
          this.setData({
            //content: jsonData["0"]["content"]
            chapter: res.data[0]
          })
          this.returnTop()
        }
      },
      fail: err => {
        console.error('[数据库] [查询记录] 失败：', err)
        return
      }
    })
  },
  gotoFirstPage: function (options) {
    wx.navigateTo({
      url: '../bookshelf/bookshelf',//要跳转到的页面路径
    })  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database()
    this.data.chapter_rank = options.book;
    this.data.book_name = parseInt(options.rank);
    // 查询当前用户所有的 counters
    console.log(options.book, options.rank)
    db.collection('chapter').where({
      book: options.book,
      rank: parseInt(options.rank),
    }).get({
      success: res => {
        console.log("查找成功！")
        console.log(res.data)
        this.setData({
          //content: jsonData["0"]["content"]
          ne: res.data,
          chapter: res.data[0]
        })
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
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})