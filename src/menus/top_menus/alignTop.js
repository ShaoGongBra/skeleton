export default {
  type: 'button',
  icon: 'jurassic_verticalalign-top',
  text: '上对齐',
  onClick() {
    const items = this.layerSelectData
    // 寻找最上边的
    let top = 2000
    for (let i = 0, l = items.length; i < l; i++) {
      top = Math.min(items[i].y, top)
    }
    // 上对齐
    for (let i = 0, l = items.length; i < l; i++) {
      items[i].y = top
    }
    this.setHostory('top')
  }
}
