import {getStorage} from '../utils/util.js'
//接口相关
export const baseURL ='https://www.yundongzhuan.net';
//静态文件地址
export const staticURL='https://kuaiyouqian.net/static/mini'
//分享配置
export function shareObj(){
  return {
    title: '每天点一点，步数红包免费拿！',
    path: `/pages/index/index?shareId=${getStorage('openid')}`,
    imageUrl: "https://kuaiyouqian.net/static/mini/shareImage.png?random=" + Date.now()
  }
}