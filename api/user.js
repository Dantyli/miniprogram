import Api from './index.js'
export default{
   getOpenid(params){
        return Api.post('/front/user/login',params)
   },
   //收取金币
   getCoin(params){
     return Api.post('/front/gold/insert',params)
   },
   //步数
   getStep(params){
     return Api.post('/front/gold/getStep',params)
   },
   //开步数红包
   openRedRun(params){
     return Api.post('/front/gold/step',params)
   },
   //session_key过期使用
   refreshSession(params){
     return Api.post('/front/user/session/key',params)
   },
   //签到数
   getSignin(params){
     return Api.post('/front/user/signin/select',params)
   },
   //签到
   postSignIn(params){
     return Api.post('/front/user/signin/insert',params)
   },
   //收支详情
   getCoinDetail(params){
     return Api.post('/front/money/select',params)
   },
   //我的
   getMyInfo(params){
     return Api.post('/front/user/my/select',params)
   },
   //查询新币
   getNewCoin(params){
     return Api.post('/front/gold/getGold',params)
   },
   //提现
   withDrawMoney(params){
     return Api.post('/front/money/withdraw',params)
   },
   //用户信息
   updateUser(params){
     return Api.post('/front/user/insert',params)
   },
   //币转钱
   exchangeCoin2Money(params){
     return Api.post('/front/gold/withdraw',params)
   }
}