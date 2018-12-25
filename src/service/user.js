/**
 * 用户相关服务
 */

import util from '../utils/util.js'
import api from '../utils/api.js'


/**
 * 调用微信登录
 */
function loginByWeixin(userInfo) {
  console.log("登陆开始");
  // 调用登录接口

  let code = null;
  return new Promise(function (resolve, reject) {
    return util.login().then(res => {
        console.log("登陆成功");
        code = res.code;
        console.log(res);
        return userInfo;
      }).then(userInfo => {
        console.log("获取token开始");
        console.log(code);
        console.log(userInfo);
        //登录远程服务器
        util.request(
            api.AuthLoginByWeixin, {
              userInfo: {
                userInfo: userInfo.userInfo,
                signature: userInfo.signature,
                errMsg: userInfo.errMsg,
                encryptedData: userInfo.encryptedData,
                rawData: userInfo.rawData,
                iv: userInfo.iv,
              },
              code: code,
            }, "POST"
          ).then(res => {
            console.log("infoed");
            console.log(res);
            if (res.errno === 0) {
              //存储用户信息
              wx.setStorageSync(
                "userInfo",
                res.data.userInfo
              );
              wx.setStorageSync("token", res.data.token);
              resolve(res);
            } else {
              util.showErrorToast(res.errmsg);
              reject(res);
            }
          })
          .catch(err => {
            reject("info 失败");
          });
      })
      .catch(err => {
        console.log(2);
        reject(err);
      });
  });
}
function getUserLocation(){
  wx.authorize({
      scope: 'scope.userLocation',
      success(res) {
          wx.getLocation({
              type: 'wgs84',
              success: function(res) {
                  var latitude = res.latitude
                  var longitude = res.longitude
                  loadCity(longitude, latitude)
              },
              fail:function(){
                wx.setStorageSync("userLocation", {
                  province:'广东省',
                  city:'韶关市',
                });
              }
          })
      }
  })
}
function loadCity(longitude, latitude){
  let that = this;
  wx.request({
      url: 'https://api.map.baidu.com/geocoder/v2/?ak=CPz7EMTWvGNIPcxygaOtQ7AGRWXuVOPA&location=' + latitude + ',' + longitude + '&output=json',
      data: {},
      header: {
          'Content-Type': 'application/json'
      },
      success: function (res) {
          // success  
          wx.setStorageSync("userLocation", {
            province:res.data.result.addressComponent.province,
            city:res.data.result.addressComponent.city,
          });
          //page.setData({ currentCity: city });
      },
      fail: function () {
          //page.setData({ currentCity: "获取定位失败" });
      },
      
  })
}
/**
 * 判断用户是否登录
 */
function checkLogin() {
  return new Promise(function (resolve, reject) {
    if (wx.getStorageSync('userInfo') && wx.getStorageSync('token')) {
      util.checkSession().then(() => {
        resolve(true);
      }).catch(() => {
        reject(false);
      });

    } else {
      reject(false);
    }
  });
}
let user = {
  loginByWeixin: loginByWeixin,
  checkLogin: checkLogin,
  getUserLocation:getUserLocation
}
export default user



