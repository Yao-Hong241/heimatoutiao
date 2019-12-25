const k = 'hm-toutiao'

export default {
  setUser (value) {
    window.sessionStorage.setItem(k, JSON.stringify(value))
  },
  getUser () {
    return JSON.parse(window.sessionStorage.getItem(k) || '{}')
  },
  delUser () {
    window.sessionStorage.removeItem(k)
  }
}
