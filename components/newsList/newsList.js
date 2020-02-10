// components/newsList/newsList.js
Component({
  data: {
    //滚动数据
    news: [
      { picpath: 'https://kuaiyouqian.net/static/mini/1.jpeg', nickname: '哒哒哒君', amount: '60' },
      { picpath: 'https://kuaiyouqian.net/static/mini/2.jpeg', nickname: '摘个星星', amount: '50' },
      { picpath: 'https://kuaiyouqian.net/static/mini/3.jpeg', nickname: "我要开大G", amount: '80' },
      { picpath: 'https://kuaiyouqian.net/static/mini/5.jpeg', nickname: 'And987', amount: '50' },
      { picpath: 'https://kuaiyouqian.net/static/mini/9.jpeg', nickname: '小耗子遇上...', amount: '70' },
      { picpath: 'https://kuaiyouqian.net/static/mini/10.jpeg', nickname: 'adoe', amount: '100' },
    ]
  },
  lifetimes: {
    attached: function () {
      // this.timer = setInterval(() => {
      //   let newNews = [...this.data.news]
      //   let item = newNews.shift()
      //   newNews.push(item)
      //   this.setData({
      //     isAnim: true
      //   })
      //   setTimeout(() => {
      //     this.setData({
      //       isAnim: false,
      //       news: newNews
      //     })
      //   }, 1000)
      // }, 3000)
    },
    detached: function () {
     // clearInterval(this.timer)
    },
  },
})
