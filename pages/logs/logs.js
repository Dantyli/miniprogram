//logs.js
//const util = require('../../utils/util.js')
import {toast} from '../../utils/util.js'
Page({
  data: {
    logs: []
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '步数乐乐赚',
      path: '/pages/logs/logs'
    }
  },
  onLoad: function () {
   
  },
  getRun(){
    // wx.openSetting({
    //   success(res) {
    //     console.log(res.authSetting)
    //     // res.authSetting = {
    //     //   "scope.userInfo": true,
    //     //   "scope.userLocation": true
    //     // }
    //     return
    //   }
    // })
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.werun']) {
          wx.authorize({
            scope: 'scope.werun',
            success() {
              wx.getWeRunData({
                success(res) {
                  // 拿 encryptedData 到开发者后台解密开放数据
                  const encryptedData = res.encryptedData
                  console.log(encryptedData)
                  console.log(res)
                }
              })

            },fail(){
              toast('weishou')
              
            }
          })
        }else{
          wx.getWeRunData({
            success(res) {
              // 拿 encryptedData 到开发者后台解密开放数据
              const encryptedData = res.encryptedData
              console.log(encryptedData)
              console.log(res.iv)
            }
          })
        }
      }
    })
  }
})
