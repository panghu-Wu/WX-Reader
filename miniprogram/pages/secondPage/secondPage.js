// miniprogram/pages/secondPage/secondPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [],
    list: [],
    thisBook: [],
    name: "",
    id: "",
    inShelf: 0,
  },

  gotoRead(e){
    var rank = e.currentTarget.dataset.rank;
    console.log(this.data.name, rank)
    wx.navigateTo({
      url: '../read1/read1?book='+this.data.name+'&rank='+rank,
    })
  },

  PushOrPopBook(){
    const db = wx.cloud.database();
    if(this.data.inShelf==1){
      //删除数据
      db.collection('bookshelf').where({
        book_id: this.data.thisBook.book_id,
      }).remove({
        success(res) {
            console.log(res.data)
            console.log('成功删除数据！')
        }
      })
      //删除数据后
      this.data.inShelf=0;
      this.setData({
        choice: "加入书架"
      })
    }else{
      //添加数据
      db.collection('bookshelf').add({
        data:{
            _openid: this.data.openid,
            book_id: this.data.thisBook.book_id,
            chapter_num: this.data.thisBook.chapter_num,
            img: this.data.thisBook.img,
            writer: this.data.thisBook.writer,
            name: this.data.thisBook.name,
        },
        success(res){
            console.log(res.data)
        },
        fail:console.error
      })
      //添加数据后
      this.data.inShelf=1;
      this.setData({
        choice: "移出书架"
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.data.id = options.book_id;
    const db = wx.cloud.database();
    //查询是否在书架
    db.collection('bookshelf').where({
      _openid: this.data.openid,
      book_id: options.book_id,
    }).get({
      success: res => {
        console.log("查找成功！")
        console.log(res.data)
        if(res.data[0]!=null){
          this.data.inShelf=1;
          this.setData({
            choice: "移出书架"
          })
        } else{
          this.setData({
            choice: "加入书架"
          })
        }
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: 'error'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
    
    //查询书记详细信息
      db.collection('book').where({
        book_id: options.book_id,
      }).get().then(res => {//formData是数据库里面集合的名称
        console.log(res); //如果更新数据成功则输出成功信息
        var that = this;
        this.data.name = res.data[0].name;
        this.data.thisBook = res.data[0];
        //var arr = this.data.array;
        //arr.push({name:res.data.name,introduction:res.data.introduction,img:res.data.img});
        that.setData({
          //arr = JSON.stringify(res.data),
          array: res.data, //数据赋值
          //array: this.data.list.concat(arr),
        });
        console.log(res.data);
      }).catch(err => {
        console.log(err); //如果更新数据失败则输出失败信息
      })
    console.log(options.chapter_num);
    for(let i = 1;i<=options.chapter_num;++i){
      this.data.list = this.data.list.concat(i);
    }
    this.setData({
      'list':    this.data.list
    });
    console.log(this.data.list);
  },
    _goBack: function () {
      wx.navigateBack({
        delta: 1
      });
    },
    _goHome: function () {
      wx.navigateTo({
        url: '../index/index',
      });
    },
    gotoBookshelf(){
      wx.navigateTo({
        url: '../bookshelf/bookshelf',
      });
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