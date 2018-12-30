<template>
  <div id="join-complete">
    <div class="success">
      <img src="../../../static/img/icon/okay.png" alt>
      <span>报名成功</span>
    </div>
    <div class="button">
      <button class="goHome" @click="goAnyWhere('../home/main')">返回首页</button>
      <button class="myOrder" @click="goAnyWhere('../my-order/main')">查看我的报名</button>
    </div>
    <div class="info">
      <div class="info-pic">
        <img src="https://huodp.cn/upload/20181127/220900852773c9.png" alt>
      </div>
      <div class="info-show">
        <span class="info-show-title">活动呗官方服务平台</span>
        <span class="info-show-count">139活动</span>&nbsp;| &nbsp;
        <span class="info-show-count">2045粉丝</span>
      </div>
      <div class="info-concern">
        <button>已关注</button>
      </div>
    </div>
    <div class="footer">
      <div class="footer-title">
        <span>—— 邀请好友一起参与活动 ——</span>
      </div>
      <div class="footer-share">
        <img src="../../../static/img/icon/ic_wechat.png" alt>
        <br>
        <span>微信好友</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {},
  methods: {
    goAnyWhere(url) {
      wx.redirectTo({ url: url });
    }
  }
};
</script>

<style scoped  lang="scss">
.success {
  text-align: center;
  margin: 15px 0px;
  img {
    width: 40px;
    height: 40px;
    vertical-align: middle;
  }
  span {
    font-size: 1.25em;
    vertical-align: middle;
  }
}
.button {
  margin-bottom: 30px;
  text-align: center;
  .goHome {
    display: inline-block;
    padding: 0px 30px;
    margin: 8px;
    color: red;
    border: 2px red solid;
    font-size: 0.99em;
  }
  .myOrder {
    display: inline-block;
    padding: 0px 15px;
    margin: 8px;
    border: 2px #999 solid;
    font-size: 0.99em;
  }
}
.info {
  padding: 20px;
  border-top: 15px #eee solid;
  border-bottom: 15px #eee solid;
  font-size: 0.8em;
  overflow: hidden;
  .info-pic {
    float: left;
    img {
      width: 50px;
      height: 50px;
    }
  }
  .info-show {
    float: left;
    font-weight: bold;
    .info-show-title {
      display: block;
      padding: 10px;
    }
    .info-show-count {
      padding: 10px;
      font-size: 0.78em;
    }
  }
  .info-concern {
    float: right;
    margin-top: 14px;
    button {
      display: inline-block;
      background: #f34343;
      color: #fff;
      line-height: 2.5em;
      font-size: 0.8em;
    }
  }
}
.footer {
  clear: both;
  .footer-title {
    text-align: center;
    padding: 25px 0px;
    color: #9ba6b5;
    font-size:0.95em;
  }
  .footer-share {
    text-align: center;
    img {
      width: 60px;
      height: 60px;
    }
  }
}
</style>
