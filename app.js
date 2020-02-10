//app.js
var aldstat = require('./utils/ald-stat.js');
var App = require('./utils/xmadx_sdk.min.js').xmad(App, 'App').xmApp;
var xmad = require('./utils/dsp_sdk.js')
import Api from './api/user.js'
import {toast,setStorage,getStorage} from './utils/util.js'
App({
  onShow: function () {
    let that=this;
    // 登录
    if(!getStorage('openid')){
      wx.login({
        success: res => {
          Api.refreshSession({ code: res.code }).then(res => {
            if(res.code=='0'){
             // setStorage('openid', res.data.openId)
              wx.aldstat.sendOpenid(res.data.openId)
              wx.dsp.setOpenid(res.data.openId)
            }
          })
        }
      })
    }else{
      wx.aldstat.sendOpenid(getStorage('openid'))
      wx.dsp.setOpenid(getStorage('openid'))
    }
   
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              lang:'zh_CN',
              success: function (res) {
                that.globalData.userInfo=res.userInfo
              }
            })
          }
        }
      })
      //更新
    const updateManager = wx.getUpdateManager()

    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
    })

    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })

    updateManager.onUpdateFailed(function () {
      // 新版本下载失败
    })

   
  },
  //在其他页面监听globalData变化，保持金币总数一致
  watch(method){
    let obj = this.globalData;
    Object.defineProperty(obj, "amount", {
      configurable: true,
      enumerable: true,
      set: function (value) {
        this.amount = value;
        console.log('执行回调-----')
        method(value);
      },
      get: function () {
        return this._name
      }
    })
  },
  //上传授权信息
  updateUerInfo(){
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            lang: 'zh_CN',
            success: function (res) {
               let params={
                 city: res.userInfo.city,
                 country: res.userInfo.country,
                 head: res.userInfo.avatarUrl,
                 nickname:res.userInfo.nickName,
                 province: res.userInfo.province,
                 sex: res.userInfo.gender,
                 status:1
               }
               Api.updateUser(params).then(res=>{

               })
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})