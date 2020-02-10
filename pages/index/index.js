var Page = require('../../utils/xmadx_sdk.min.js').xmad(Page).xmPage;
//index.js
import Api from '../../api/user.js'
import {getStorage,setStorage,toast} from '../../utils/util.js'
import {shareObj} from '../../config/index.js'
//获取应用实例
const app = getApp()
//收取动画进行中
let isAnimating=false
let shareId=''
let goldToken=''
//音效
const innerAudioContext = wx.createInnerAudioContext()
innerAudioContext.src = 'https://kuaiyouqian.net/static/mini/bg.mp3';
let videoAd = null
//步数信息
let steps=[
  { step: 1, coin: 5 },
  { step: 1000, coin: 10 },
  { step: 3000, coin: 20 },
  { step: 6000, coin: 30 },
  { step: 10000, coin: 50 },
  { step: 25000, coin: 60 },
  { step: 40000, coin: 70 },
  { step: 50000, coin: 80 },
  { step: 60000, coin: 90 },
  { step: 80000, coin: 100 }
]
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    firstShow:true,
    //判断跳动还是收取
    red1: true,
    red2: true,
    red3: true,
    red4:true,
    red11: {},
    red22: {},
    red33: {},
    red44: {},
    redball:false,
    amount:'--',
    //签到
    signin:0,
    signInType:false,
    //步数
    step:0,
    stepArr:[],
    redgifted:false,
    //是否授权微信步数
    isAuthRun:true,
    //分享弹框
    share:false,
    xmad: {
      adData: {},
      ad: {
        banner: "xm647c6209e7b95a4849680ab52467c6", // 请填⼊入您的banner⼴广告位ID
        insert: "", // 请填⼊入您的插屏⼴广告位ID
      }
    },
    bsbz:false,
    opening:false,
    kpjiangli:0
  },
  bindClose(){
    this.setData({
       redball:false,
       redgifted:false,
       share:false,
      bsbz:false,
      opening:false
    })
  },
  //开红包
  openRed(){
    let params = {
      type: 3,
      location: 0,
      name: '幸运奖励',
      number: 0,
      typeId: 3
    }
    Api.getNewCoin(params).then(res => {
      console.log(res)
      if (res.code == 0) {
            goldToken=res.data.goldToken
            this.getCoin(1)
      }else{
        toast(res.msg)
      }
    })
  },
  watchVideo(){
    if (videoAd) {
      videoAd.show().catch(() => {
        // 失败重试
        videoAd.load()
          .then(() => videoAd.show())
          .catch(err => {
            this.openRed()
          })
      })
    } else {
      this.openRed()
    }
  },
  //点击金币
  bindClick(e){
    if(isAnimating) return;
    innerAudioContext.play()
    isAnimating=true;
    let i=e.target.dataset.id
    let shou='red'+i;
    let shous=shou+i;
    this.setData({
      [shou]:false
    })
    //签到直接发放金币
    if (this.data[shous].type==2){
      let timestamp1 = Date.now()
      Api.postSignIn({notLoading:true}).then(res => {
        if (res.code == '0') {
          if (Date.now() - timestamp1 < 1500) {
          setTimeout(()=>{
            isAnimating = false;
            this.setData({
              signin: this.data.signin + 1,
              [shou]: true,
              [shous]: {}
            })
            wx.navigateTo({
              url: '/pages/signin/signin?signDays=' + this.data.signin,
            })
          }, 1500 - Date.now() + timestamp1)
          }else{
            isAnimating = false;
            this.setData({
              signin: this.data.signin + 1,
              [shou]: true,
              [shous]: {}
            })
            wx.navigateTo({
              url: '/pages/signin/signin?signDays=' + this.data.signin,
            })
          }
        }
      })
    }else{
      let params = {
        type: 1,
        location: i,
        name: this.data[shous].name,
        number: this.data[shous].number,
        typeId: this.data[shous].id,
        notLoading:true
      }
      let timestamp1 = Date.now()
      Api.getNewCoin(params).then(res => {
        goldToken = res.data.goldToken;
        if (res.code == 0) {
          if (Date.now() - timestamp1 < 1500) {
            setTimeout(() => {
              isAnimating = false;
              switch (this.data[shous].type) {
                case 4:
                  this.setData({
                    share: true
                  })
                  break;
                case 5:
                  //toast('广告')
                  // if (videoAd) {
                  //   videoAd.show().catch(() => {
                  //     // 失败重试
                  //     videoAd.load()
                  //       .then(() => videoAd.show())
                  //       .catch(err => {
                  //         this.getCoin(0)
                  //       })
                  //   })
                  // } else {
                    this.getCoin(0)
                 // }
                  break
                case 6:
                 // toast('播视频广告')
                  if (videoAd) {
                    videoAd.show().catch(() => {
                      // 失败重试
                      videoAd.load()
                        .then(() => videoAd.show())
                        .catch(err => {
                          this.getCoin(0)
                        })
                    })
                  }else{
                    this.getCoin(0)
                  }
                  break;
              }
              this.setData({
                [shou]: true,
                [shous]: res.data.gold
              })
            }, 1500 - Date.now() + timestamp1)
          }else{
            isAnimating = false;
            switch (this.data[shous].type) {
              case 4:
                this.setData({
                  share: true
                })
                break;
              case 5:
                // if (videoAd) {
                //   videoAd.show().catch(() => {
                //     // 失败重试
                //     videoAd.load()
                //       .then(() => videoAd.show())
                //       .catch(err => {
                //         this.getCoin(0)
                //       })
                //   })
                // } else {
                  this.getCoin(0)
               // }
                break
              case 6:
                if (videoAd) {
                  videoAd.show().catch(() => {
                    // 失败重试
                    videoAd.load()
                      .then(() => videoAd.show())
                      .catch(err => {
                        this.getCoin(0)
                      })
                  })
                } else {
                  this.getCoin(0)
                }
                break;
            }
            this.setData({
              [shou]: true,
              [shous]: res.data.gold
            })
          }
        }else{
          toast(res.msg)
        }
      })
    }
  },
  //分发金币
  getCoin(type){
    let params={
      goldToken:goldToken
    }
    Api.getCoin(params).then(res=>{
          if(res.code==0){
            if(!type){
              this.setData({
                amount: res.data.money
              })
            }else{
              this.setData({
                redball: false,
                redgifted: true,
                amount: res.data.money
              })
            }
                
          }
    })
  },
  onShow: function () {
    isAnimating=false;
    let that=this;
    // 登录
    if (!getStorage('openid')) {
      wx.login({
        success: res => {
          Api.getOpenid({ code: res.code,upId:shareId }).then(res => {
            if(res.code=='0'){
              setStorage('openid', res.data.openId)
              that.connectData(res.data)
              //获取步数
              this.getWeRun()
            }
          })
          
        }
      })
    }else{
      wx.checkSession({
        success() {
          //获取步数
          that.getWeRun()
        },
        fail() {
          wx.login({
            success:res=>{
              Api.refreshSession({ code: res.code}).then(data=>{
                  //获取步数
                  that.getWeRun()
                })
            }
          })
        }
      })
      Api.getOpenid({ upId: shareId}).then(res=>{
             if(res.code=='0'){
               that.connectData(res.data)
             }
        })
    }
  },
  onLoad(e){
    if (getStorage('notFirst')) {
      this.setData({
        firstShow: false
      })
    } else {
      setStorage(
        'notFirst', '222'
      )
    }
    shareId = e.shareId||'';
    if (wx.createRewardedVideoAd) {
      videoAd = wx.createRewardedVideoAd({
        adUnitId: 'adunit-e6053c73b7c04ed4'
      })
      videoAd.onClose(res => {
        // 用户点击了【关闭广告】按钮
        if (res && res.isEnded) {
          if (!this.data.redball){
            this.getCoin(0)
          }else{
            this.openRed()
          }
          
        } else {
          // 播放中途退出，不下发游戏奖励
        }
      })
    }
  },
  //初始化网络数据
  connectData(data){
    let newGold=[]
    for(let i=0;i<4;i++){
      if (data.goldList[i]){
        newGold.push(data.goldList[i])
      }else{
        newGold.push({})
      }
    }
      this.setData({
        signin:data.signIn,
        red11: newGold[0],
        red22: newGold[1],
        red33: newGold[2],
        red44: newGold[3],
        amount: data.goleMoney,
        signInType: data.signInType,
        redball:data.popout,
        kpjiangli:data.number
      })
  },
  //获取步数
  getWeRun(){
    let that=this
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.werun']) {
          wx.authorize({
            scope: 'scope.werun',
            success() {
              wx.getWeRunData({
                success(res) {
                  that.getWeRunData(res.encryptedData, res.iv)
                }
              })

            }, fail() {
              that.setData({
                isAuthRun:false
              })
              toast('授权后才可领取奖励')
              that.setData({
                stepArr:[
                  { status: 2, nums: 5 },
                  { status: 2, nums: 10 },
                  { status: 2, nums: 20 },
                  { status: 2, nums: 30 },
                  { status: 2, nums: 50 },
                  { status: 2, nums: 60 },
                  { status: 2, nums: 70 },
                  { status: 2, nums: 80},
                  { status: 2, nums: 90},
                  { status: 2, nums:100}
                ]
              })

            }
          })
        } else {
          wx.getWeRunData({
            success(res) {
              that.getWeRunData(res.encryptedData, res.iv)
            }
          })
        }
      }
    })
   
  },
  //异步交换数据
  getWeRunData(encry,iv){
    let params = {
      encryptedData:encry,
      iv:iv,
      notLoading:true
    }
    let jifen=[5,10,20,30,50,60,70,80,90,100];
    let newArr=[]
    this.setData({
      isAuthRun: true
    })
    Api.getStep(params).then(res => {
        if(res.code=='0'){
          newArr = res.data.stepRedPacket.map((item,index)=>{
             return {...item,nums:jifen[index]}
          })

          this.setData({
            step:res.data.step,
            stepArr:newArr
          })
        }else{
          wx.login({
            success: res => {
              Api.refreshSession({ code: res.code, upId: shareId }).then(data => {
                //获取步数
                this.getWeRun()
              })
            }
          })
        }
    })
  },
  //领步数红包
  getRunGift(e){
    let target=e.target.dataset;
    if(target.status!==0){
      if(target.status==2){
         this.setData({
           bsbz:true
         })
      }
      return;
    }
    let params={
      location:target.id
    }
    let changeStatus=`stepArr[${target.id-1}].status`
    Api.openRedRun(params).then(res=>{
      if(res.code=='0'){
           this.setData({
             huode: steps[target.id-1].coin,
             bushu: steps[target.id].step,
             yuji: steps[target.id].coin,
             [changeStatus]:1,
             amount:res.data.money,
             opening:true
           })
      }else{
        toast(res.msg)
      }
    })
  },
  //签到
  signIn(){
    Api.postSignIn().then(res=>{
      if(res.code=='0'){
        this.setData({
          signin: res.data.signIn
        })
      }else{
        toast(res.msg)
      }
      
    })
  },
  //打开设置
  getAuth(){
    wx.openSetting({
      
    })
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
   //获取头像等信息
  bindGetUserInfo(e) {
    this.setData({
      firstShow: false
    })
    if (e.detail.userInfo){
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      app.updateUerInfo()
    }else{
      toast('授权后享受更好体验！')
    }
  },
  goIntr(){
    wx.navigateTo({
      url: '/pages/introduce/introduce',
    })
  },
  goIncome(){
    wx.navigateTo({
      url: '/pages/integral/integral',
    })
  },
  goSign(){
    let that=this;
    wx.navigateTo({
      url: '/pages/signin/signin?signDays=' + that.data.signin,
    })
  },
  onShareAppMessage: function (res) {
    return shareObj();
  }
})
