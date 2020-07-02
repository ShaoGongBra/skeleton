export default {
  type: 'input-show',
  icon: 'biaoti',
  show: false,
  text: '骨架屏名称',
  value: '骨架屏',
  placeholder: '请输入名称',
  onClick() {
    this.topMenus.title.show = !this.topMenus.title.show
  },
  onInput(value) {
    this.topMenus.title.value = value
  }
}
