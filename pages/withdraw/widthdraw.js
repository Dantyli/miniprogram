// pages/withdraw/widthdraw.js
var Page = require('../../utils/xmadx_sdk.min.js').xmad(Page).xmPage;
import {toast} from '../../utils/util.js';
import Api from '../../api/user.js';
import { shareObj } from '../../config/index.js'
const arr = ['50', '60','70','80', '100'];
const app=getApp()
// 在页面中定义插屏广告
let interstitialAd = null
Page({
  data:{
    money:'--',
    txMoney:'50',
    hasUserInfo:false,
    times:0,
    xmad: {
      adData: {},
      ad: {
        banner: "xm380ea85d552f053ce98e3388a973c6", // 请填⼊入您的banner⼴广告位ID
        insert: "", // 请填⼊入您的插屏⼴广告位ID
      }
    },
    txtips:false
  },
  goProblem(){
    wx.navigateTo({
      url: '/pages/problem/problem',
    })
  },
  handleChange(){
    let that=this;
    wx.showActionSheet({
      itemList: arr,
      success(res) {
        that.setData({
          txMoney: arr[res.tapIndex]
        })
      },
      fail(res) {
        
      }
    })

  },
  onReady(){
    if (app.globalData.userInfo){
      this.setData({
        hasUserInfo:true
      })
    }
    Api.getMyInfo().then(res => {
      if (res.code == '0') {
        this.setData({
          money: res.data.money/100
        })
      }else{
        toast(res.msg)
      }
    })
  },
  onShareAppMessage: function () {
     return shareObj();
  },
  withDraw(){
    let {money,txMoney}=this.data;
    if(money<txMoney){
      toast('提现金额不足！')
      return;
    }
    if(this.data.times==0){
      this.setData({
        txtips: true
      })
      return;
    }
    Api.withDrawMoney({ money: this.data.txMoney }).then(res => {
      if (res.code == 0) {
        wx.showModal({
          title: '提交成功',
          content: '提现申请提交成功，将在1-2个工作日到账',
          success(res) {
            wx.reLaunch({
              url: '/pages/mine/mine'
            })
          }
        })
      } else {
        toast(res.msg)
      }
    })
  },
  bindGetUserInfo(e){
      if (e.detail.userInfo) {
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
          hasUserInfo: true
        })
        app.updateUerInfo()
      } else {
        toast('授权后完成提现！')
      }
  },
  tx(){
    this.setData({
      times:1
    })
    
  },
  onLoad(){
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
  onShow(){
    // 在适合的场景显示插屏广告
    if (interstitialAd) {
      interstitialAd.show().catch((err) => {
        console.error(err)
      })
    }
  }
})