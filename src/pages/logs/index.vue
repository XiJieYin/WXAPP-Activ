<template>
  <div>
    sss
  </div>
</template>

<script>
import { formatTime } from '@/utils/index'

export default {
  components: {
    
  },
  data () {
    return {
      logs: []
    }
  },
  mounted() {
    console.log(this.$root.$mp)
  },
  created () {
    const logs = (wx.getStorageSync('logs') || [])
    this.logs = logs.map(log => formatTime(new Date(log)))
  }
}
</script>

<style>
.log-list {
  display: flex;
  flex-direction: column;
  padding: 40rpx;
}

.log-item {
  margin: 10rpx;
}
</style>
