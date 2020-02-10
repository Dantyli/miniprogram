import {toast,getStorage} from '../utils/util.js'
import {baseURL} from '../config/index.js'
/*
useBASE是否使用默认请求前缀
*/
function ajax(url,data={},method='post',useBASE=1){
  let Url=url
    if(useBASE){
      Url=baseURL+url
    }
    let newData=data;
    if(getStorage('openid')){
      newData={...data,openId:getStorage('openid')}
    }
     return new Promise((resolve,reject)=>{
       if(!data.notLoading){
         wx.showLoading({
           title: '加载中...',
           mask: true,
           icon: "none"
         })
       }
       wx.request({
         url: Url,
         data: newData,
         method:method,
         header: {
           'Content-type': 'application/x-www-form-urlencoded'
         },
         success(res){
           if(res.statusCode==200){
             resolve(res.data)
           }else{
             toast('服务器异常！')
           }
         },
         fail(){
           toast('网络异常！')
           reject('error')
         },
         complete(){
           if(!data.notLoading){
             wx.hideLoading()
           }
         }
       })
     })
}
export default{
  get(url,params={},useBASE=1){
      return ajax(url,params,'get',useBASE)
  },
  post(url,params={},useBASE=1){
    return ajax(url,params,'post',useBASE)
  }
}