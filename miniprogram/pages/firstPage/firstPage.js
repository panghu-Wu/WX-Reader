// miniprogram/pages/firstPage/firstPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    array: [],
    num: [],
    index: [0,1,2,3,4,5,6,7,8,9],
    findbook: [],
    keyWord: "",
    inputVal: "",
    border1: "",
    border2: "",
    border3: "",
    color1: "black",
    color2: "black",
    color3: "black",
  },

  choose_1: function() {
    if(this.data.color1=="black"){
      this.data.color1="rebeccapurple";this.data.color2="black";this.data.color3="black";
      this.data.border1="solid";this.data.border2="";this.data.border3="";
      this.setData({
        color1: "rebeccapurple",
        color2: "black",
        color3: "black",
        border1: this.data.border1,
        border2: this.data.border2,
        border3: this.data.border3,
      })
    }

    const db = wx.cloud.database();
    const _=db.command;
      db.collection('book').where({
        classification: 1,
      }).get().then(res => {
        console.log(res); 
        var that = this;
        that.setData({
          array: res.data, 
        });
        console.log(res.data);
      }).catch(err => {
        console.log(err); 
      })
  },

  choose_2: function() {
    if(this.data.color2=="black"){
      this.data.color1="black";this.data.color2="rebeccapurple";this.data.color3="black";
      this.data.border1="";this.data.border2="solid";this.data.border3="";
      this.setData({
        color1: "black",
        color2: "rebeccapurple",
        color3: "black",
        border1: this.data.border1,
        border2: this.data.border2,
        border3: this.data.border3,
      })
    }
    const db = wx.cloud.database();
    const _=db.command;
      db.collection('book').where({
        classification: 2,
      }).get().then(res => {
        console.log(res); 
        var that = this;
        that.setData({
          array: res.data, 
        });
        console.log(res.data);
      }).catch(err => {
        console.log(err); 
      })
  },

  choose_3: function() {
    if(this.data.color3=="black"){
      this.data.color1="black";this.data.color2="black";this.data.color3="rebeccapurple";
      this.data.border1="";this.data.border2="";this.data.border3="solid";
      this.setData({
        color1: "black",
        color2: "black",
        color3: "rebeccapurple",
        border1: this.data.border1,
        border2: this.data.border2,
        border3: this.data.border3,
      })
    }
    const db = wx.cloud.database();
    const _=db.command;
      db.collection('book').where({
        classification: 3,
      }).get().then(res => {
        console.log(res); 
        var that = this;
        that.setData({
          array: res.data, 
        });
        console.log(res.data);
      }).catch(err => {
        console.log(err); 
      })
  },

  showInput: function () {
    this.setData({
        inputShowed: true
    });
  },
  hideInput: function () {
      this.setData({
          inputVal: "",
          inputShowed: false,
          findbook: [],
      });
  },
  clearInput: function () {
      this.setData({
          inputVal: ""
      });
  },
  
  inputTyping: function (e) {
      this.setData({
          inputVal: e.detail.value,
      });
      this.data.findbook = [];
      this.Search();
  },

  Show(){
    this.setData({
      color1: "black",
      color2: "black",
      color3: "black",
      border1: "",
      border2: "",
      border3: "",
    })

    var randnum = [];
    for(let i = 0;i<100;++i){
      randnum[i] = i;
    }
    for(let i = 99;i>=90;--i){
      var index = Math.floor(Math.random()*100);
      randnum[i] = randnum[index];
      this.data.num[100-i-1] = "00"+randnum[i].toString();
      randnum[index] = i;
    }
    console.log(randnum);
    console.log(this.data.num);
    const db = wx.cloud.database();
    const _=db.command;
      db.collection('book').where({
        book_id: _.in(this.data.num),
      }).get().then(res => {//formData是数据库里面集合的名称
        console.log(res); //如果更新数据成功则输出成功信息
        var that = this;
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
  },

  Search(){
    const db = wx.cloud.database();
    db.collection('book').where({
      name: {
        $regex: this.data.inputVal,
        $options: 'i',
      }
    }).get().then(res => {
      console.log(res); //如果更新数据成功则输出成功信息
      var that = this;
      that.setData({
        findbook: res.data,
      });
      console.log(res.data);
    }).catch(err => {
      console.log(err);
    })
    console.log(this.data.findbook);
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    this.Show();
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

  },
})