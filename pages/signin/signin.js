// pages/signin/signin.js
var Page = require('../../utils/xmadx_sdk.min.js').xmad(Page).xmPage;
import { shareObj } from '../../config/index.js'
let interstitialAd = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
      days:0,
    xmad: {
      adData: {},
      ad: {
        banner: "xm9ad7f059b0f0ff8d611eb450d9cf59", // 请填⼊入您的banner⼴广告位ID
        insert: "", // 请填⼊入您的插屏⼴广告位ID
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
       this.setData({
         days:options.signDays
       })
    if (wx.createInterstitialAd) {
      interstitialAd = wx.createInterstitialAd({
        adUnitId: 'adunit-b727dbd396683320'
      })
      interstitialAd.onLoad(() => { })
      interstitialAd.onError((err) => { })
      interstitialAd.onClose(() => { })
    }
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
    // 在适合的场景显示插屏广告
    if (interstitialAd) {
      interstitialAd.show().catch((err) => {
        console.error(err)
      })
    }
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
  onShareAppMessage: function (res) {
    return shareObj();
  }
})