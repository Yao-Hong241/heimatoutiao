<template>
  <el-select :value="value" placeholder="请选择" clearable @change="changeChannel">
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      // channelId: null,
      // 频道选择对象
      channelOptions: []
    }
  },
  created () {
    this.getChannelOptions()
  },
  methods: {
    // 获取频道选项的数据
    async getChannelOptions () {
      const {
        data: { data } } = await this.$http.get('channels')
      this.channelOptions = data.channels
    },
    // 频道选择处理函数
    changeChannel (channelId) {
      // if (this.channelId === '') this.channelId = null
      if (channelId === '') channelId = null
      this.$emit('input', channelId)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
