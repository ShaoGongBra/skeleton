export default {
  type: 'button',
  icon: 'jurassic_horizalign-right',
  text: '右对齐',
  onClick() {
    const items = this.layerSelectData
    // 寻找最右边的
    let right = 0
    for (let i = 0, l = items.length; i < l; i++) {
      right = Math.max(items[i].x + items[i].width, right)
    }
    // 右对齐
    for (let i = 0, l = items.length; i < l; i++) {
      items[i].x = right - items[i].width
    }
    this.setHostory('right')
  }
}
