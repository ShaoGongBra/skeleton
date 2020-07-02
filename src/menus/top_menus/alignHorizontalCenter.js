export default {
  type: 'button',
  icon: 'jurassic_horizalign-center',
  text: '横向居中对齐',
  onClick() {
    const items = this.layerSelectData
    // 寻找中间值
    let center = 0
    for (let i = 0, l = items.length; i < l; i++) {
      center += items[i].x + items[i].width / 2
    }
    center /= items.length
    // 居中对齐
    for (let i = 0, l = items.length; i < l; i++) {
      items[i].x = center - items[i].width / 2
    }
    this.setHostory('horizontal_center')
  }
}
