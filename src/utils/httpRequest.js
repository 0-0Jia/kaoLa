// 接口地址
const host = 'https://qgailab.com:12410/kaola-customer' 
 
function request (url, method, data, header = {}) {
  wx.showLoading({
    title: '加载中' // 数据请求前loading
  })
  return new Promise((resolve, reject) => {
    let cookie = wx.getStorageSync("sessionid").split(";")[0];
    
    wx.request({
      url: host + url, 
      method: method,
      data: data,
      headers: {
        'content-type': 'application/json', // 默认值
        'cookie': cookie
      },
      success: function (res) {
        wx.hideLoading()
        resolve(res)
      },
      fail: function (res) {
        wx.hideLoading()
        // reject(false)
      },
      complete: function () {
        wx.hideLoading()
      }
    })
  })
}
 
function get (obj) {
  return request(obj.url, 'GET', obj.data)
}
 
function post (obj) {
  return request(obj.url, 'POST', obj.data)
}
 
export default {
  request,
  get,
  post,
  host
}