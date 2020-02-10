// pages/lucky/lucky.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      active:0,
      prize:2,
      value:'',
      disa:false
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showTabBarRedDot({
      index:1
    })
    wx.setTabBarBadge({
      index: 0,
      text: '1'
    })
  },
  change(e){
    this.setData({
      value:e.detail.value
    })
  },
 confirm(){
   this.setData({
     prize:this.data.value
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
  },
  start(){
    if(this.data.disa){return}
    this.setData({
      disa:true
    })
    clearTimeout(timers)
    let timers=setTimeout(()=>{
      clearInterval(_timer)
      let times=0
     let timer1 = setInterval(() => {
        let num;
        if (this.data.active < 7) {
          num = this.data.active + 1
        } else {
          num = 0
          times++
        }
       let prize = Number(this.data.prize)
        //提前3步降速
       let preStep = prize - 3 < 0 ? prize + 5 : prize - 3;
        if (times>2 && preStep==this.data.active){
             clearInterval(timer1)
          let _timer1 = setInterval(() => {
            let num1;
            if (this.data.active < 7) {
              num1 = this.data.active + 1
            } else {
              num1 = 0
            }
            this.setData({
              active: num1
            })
            if (num1 == prize){
              clearInterval(_timer1)
              this.setData({
                disa: false
              })
            }
          }, 300)
        }
        this.setData({
          active: num
        })
      }, 150)
    },2000)
   let _timer= setInterval(()=>{
      let num;
      if (this.data.active < 7) {
        num = this.data.active + 1
      } else {
        num = 0
      }
      this.setData({
        active:num
      })
    },300)
  }
})