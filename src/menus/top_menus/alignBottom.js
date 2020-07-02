export default {
  type: 'button',
  icon: 'jurassic_verticalalign-bottom',
  text: '下对齐',
  onClick() {
    const items = this.layerSelectData
    // 寻找最下边的
    let bottom = 0
    for (let i = 0, l = items.length; i < l; i++) {
      bottom = Math.max(items[i].y + items[i].height, bottom)
    }
    // 下对齐
    for (let i = 0, l = items.length; i < l; i++) {
      items[i].y = bottom - items[i].height
    }
    this.setHostory('bottom')
  }
}
