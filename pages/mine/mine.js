// pages/mine/mine.js
var Page = require('../../utils/xmadx_sdk.min.js').xmad(Page).xmPage;
import Api from '../../api/user.js'
import {getStorage,toast} from '../../utils/util.js'
import { shareObj } from '../../config/index.js'
let interstitialAd = null
let videoAd = null
Page({
  data: {
    coin:0,
    money:0,
    signIn:0,
    exchange:false,
    canChange:0,
    xmad: {
      adData: {},
      ad: {
        banner: "xm75be04c97449d5587bdb3c16e90d03",
        insert: "xma9c1f6464209a99dd23972154fc373",
      }
    }
  },
  onShow: function () {
     this.initData()
    // 在适合的场景显示插屏广告
    if (interstitialAd) {
      interstitialAd.show().catch((err) => {
        console.error(err)
      })
    }
  },
  exchangeToMoney(){
    const canUse=Math.floor(this.data.coin/10)*10;
    if(canUse==0){
      toast('乐赚币大于10个才可兑换')
      return;
    }
    this.setData({
      exchange:true,
      canChange:canUse
    })
  },
  close(){
    this.setData({
      exchange: false
    })
  },
  initData(){
    Api.getMyInfo().then(res => {
      if (res.code == '0') {
        this.setData({
          coin: res.data.goldMoney,
          money: res.data.money,
          signIn: res.data.userTask[2].status
        })
      }
    })
  },
  exchange(){
    // 用户触发广告后，显示激励视频广告
    if (videoAd) {
      videoAd.show().catch(() => {
        // 失败重试
        videoAd.load()
          .then(() => videoAd.show())
          .catch(err => {
            this.toChange()
          })
      })
    }else{
      this.toChange()
    }
   
  },
  toChange(){
    let params = {
      money: this.data.canChange,
      status: 2,
      type: 1
    }
    Api.exchangeCoin2Money(params).then(res => {
      if (res.code == 0) {
        this.initData()
        this.close()
      } else {
        toast(res.msg)
      }
    })
  },
  onShareAppMessage: function (res) {
    return shareObj();
  },
  goIncome(){
    wx.navigateTo({
      url: '/pages/integral/integral'
    })
  },
  goWD(){
    wx.navigateTo({
      url: '/pages/withdraw/widthdraw'
    })
  },
  //签到
  signin(){
    if(!this.data.signIn){
      Api.postSignIn().then(res=>{
        if(res.code=='0'){
          this.setData({
            signIn:1
          })
          wx.navigateTo({
            url: '/pages/signin/signin?signDays='+res.data.signIn,
          })
          //this.initData()
        }
      })
    }
  },
  onLoad(){
    if (wx.createInterstitialAd) {
      interstitialAd = wx.createInterstitialAd({
        adUnitId: 'adunit-bb9e23319569d3dd'
      })
    }
    if (wx.createRewardedVideoAd) {
      videoAd = wx.createRewardedVideoAd({
        adUnitId: 'adunit-2512f225bfac8e18'
      })
      videoAd.onClose(res => {
        // 用户点击了【关闭广告】按钮
        if (res && res.isEnded) {
          this.toChange()
        } else {
          // 播放中途退出，不下发游戏奖励
        }
      })
    }

  }
})