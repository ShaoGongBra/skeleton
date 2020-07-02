export default {
  type: 'button',
  icon: 'jurassic_horizalign-left',
  text: '左对齐',
  onClick() {
    const items = this.layerSelectData
    // 寻找最左边的
    let left = 1000
    for (let i = 0, l = items.length; i < l; i++) {
      left = Math.min(items[i].x, left)
    }
    // 左对齐
    for (let i = 0, l = items.length; i < l; i++) {
      items[i].x = left
    }
    this.setHostory('left')
  }
}
