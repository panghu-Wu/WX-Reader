const app = getApp()

Page({
  data: {
    texts:'',
    files: [],
    dailytitle:'',
    dailyContent:'',
    imgURL:"",
  },
  // 提交界面
  submit_imformation:function(e){
    var dailyContent=this.data.dailyContent;
    var dailytitle=this.data.dailytitle;
    let date = e.currentTarget.dataset['date'];
    let month = e.currentTarget.dataset['month'];
    let year = e.currentTarget.dataset['year'];
    let img = e.currentTarget.dataset['img'];
    const db = wx.cloud.database();
    db.collection('usertxt').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        txtcontent: dailyContent,
        titlecontent: dailytitle,
        date: date,
        month:month,
        year:year,
        imgURL:img,
      },
      success: function(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        /*
        wx.showModal({
          title: '提示',
          confirmText: '确定',
          cancelText: '取消',
          content: '确认提交',
            success: function (res) {
              if (res.confirm) {
                //wx.redirectTo({
                wx.navigateBack({
                  url: '../calendar_index/calendar_index'
                })
              }else if (res.cancel) {
                return;
      
              }
            }
          })
        console.log(res);
        */
        wx.showToast({
          title: '新增记录成功',
        })
        console.log(res);
      }
    })
    
    wx.navigateBack({//关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages 获取当前的页面栈，决定需要返回几层。
      delta: 1//返回两层
    })
    /*
    wx.navigateTo({//保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。小程序中页面栈最多十层。
      url: '../calendar_index/calendar_index'
    })
    let pages=getCurrentPages()
    let prepage=pages[pages.length-2]
    prepage.refresh()*/
    
  },
  //上传图片
  //上传文件
  upload(){
    //把this赋值给that，就相当于that的作用域是全局的。
    let that = this;
    console.log("jaj");
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log("成功",res);
        that.uploadImage(res.tempFilePaths[0]);
      }
    })
  },
  uploadImage(fileURL) {
    wx.cloud.uploadFile({
      cloudPath:new Date().getTime()+'.png', // 上传至云端的路径
      filePath: fileURL, // 小程序临时文件路径
      success: res => {
        // 返回文件 ID
        console.log("上传成功",res)
        //获取文件路径
        this.setData({
          imgURL:res.fileID
        })
      },
      fail: console.error
    })
  },
  // 上传图片
  doUpload: function () {
    // 选择图片
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      
      success: function (res) {

        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]
        
        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath, // 上传至云端的路径
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)
            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            
            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },
  //删除
  removeImage(e) {
    var files = this.data.files;
    var index = e.currentTarget.dataset.index;
    files.splice(index, 1);
    this.setData({
      files: files
    });
  },

  //写入文本内容
  textInput: function(e) {
    this.setData({
      dailyContent: e.detail.value
    })
  },
  //写入标题内容
  titleInput: function(e) {
    this.setData({
      dailytitle: e.detail.value
    })
  },

  //新增备忘
  storeTap: function() {
    var dailyContent=this.data.dailyContent;
    var dailytitle=this.data.dailytitle;
    const db = wx.cloud.database();
    db.collection('usertxt').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        txtcontent: dailyContent,
        titlecontent: dailytitle,
      },
      success: function(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        wx.showToast({
          title: '新增记录成功',
        })
        console.log(res);
      }
    })

  },

  onLoad: function (options) {

    const {
      fileID,
      cloudPath,
      imagePath,
    } = app.globalData

    this.setData({
      fileID,
      cloudPath,
      imagePath,
    })

    //接收日期
    var onedate = wx.getStorageSync('selectdate');
    var oneyear = wx.getStorageSync('selectyear');
    var onemonth = wx.getStorageSync('selectmonth');
    console.log(onemonth);
    this.setData({selectdate:onedate});
    this.setData({selectyear:oneyear});
    this.setData({selectmonth:onemonth});

    /*
    wx.removeStorage({
      key: 'selectdate',
      key: 'selectyear',
      key: 'selectmonth',
    })*/


  },
  previewImage: function(e){
    wx.previewImage({
        current: e.currentTarget.id, // 当前显示图片的http链接
        urls: this.data.files // 需要预览的图片http链接列表
    })
  }
})