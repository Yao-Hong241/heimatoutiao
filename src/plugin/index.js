import mybread from '@/components/my-bread'
import mychannel from '@/components/my-channel'
export default {
  install: (Vue) => {
    Vue.component(mybread.name, mybread)
    Vue.component(mychannel.name, mychannel)
  }
}
