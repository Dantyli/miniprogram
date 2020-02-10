// pages/integral/integral.js
var Page = require('../../utils/xmadx_sdk.min.js').xmad(Page).xmPage;
import Api from '../../api/user.js'
import { shareObj } from '../../config/index.js'
let interstitialAd = null
Page({

  data: {
      income:0,
      todayIncome:0,
      list:[],
    xmad: {
      adData: {},
      ad: {
        banner: "xm3f191441521d02fef8bc2aa1a680d5", // 请填⼊入您的banner⼴广告位ID
        insert: "", // 请填⼊入您的插屏⼴广告位ID
      }
    }
  },

  onLoad: function (options) {
     Api.getCoinDetail().then(res=>{
       if(res.code=='0'){
           this.setData({
             income: res.data.goldMoney,
             todayIncome: res.data.goldMoneyDay,
             list: res.data.moneyDetails
           })
       }
     })
    // 在页面onLoad回调事件中创建插屏广告实例
    if (wx.createInterstitialAd) {
      interstitialAd = wx.createInterstitialAd({
        adUnitId: 'adunit-b727dbd396683320'
      })
      interstitialAd.onLoad(() => { })
      interstitialAd.onError((err) => { })
      interstitialAd.onClose(() => { })
    }

  },
  onShareAppMessage: function (res) {
    return shareObj();
  },
  onShow(){
    // 在适合的场景显示插屏广告
    if (interstitialAd) {
      interstitialAd.show().catch((err) => {
        console.error(err)
      })
    }
  }
})