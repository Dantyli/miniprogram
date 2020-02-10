//封装小程序api，简化代码
//toast提示
export function toast(data){
 return  wx.showToast({
            title:data,
            icon: 'none',
            duration: 2000
          })
}
//设置数据存储
export function setStorage(key,value){
  return   wx.setStorage({
            key: key,
            data: value
          })
}
export function getStorage(key){
  return wx.getStorageSync(key)
}
export function removeStorage(key){
  wx.removeStorageSync(key)
}