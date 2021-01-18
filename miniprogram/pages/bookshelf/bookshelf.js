// miniprogram/pages/bookshelf/bookshelf.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  checkboxChange: function (e) {
    console.log('checkbox发生change事件');
  },
  gotoManagePage(){
    wx.navigateTo({
      url: '../read/read'
    })
  },
  gotoIndexPage(){
    wx.navigateTo({
      url: '../firstPage/firstPage'
    })
  },
  gotoCatalogPage(e){
    var book_id = e.currentTarget.dataset.book_id;
    var chapter_num = e.currentTarget.dataset.chapter_num; 
    console.log(book_id)
    wx.navigateTo({
      url: '../secondPage/secondPage?book_id='+book_id+'&chapter_num='+chapter_num,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
   
    db.collection('bookshelf').where({
      _openid: this.data.openid,
    }).get({
      success: res => {
        console.log("查找成功！")
        console.log(res.data)
        this.setData({
          //content: jsonData["0"]["content"]
          ne: res.data,
          
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
    this.onLoad()
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