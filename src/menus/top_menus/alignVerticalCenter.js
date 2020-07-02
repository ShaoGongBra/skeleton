export default {
  type: 'button',
  icon: 'jurassic_verticalalign-center',
  text: '竖向居中对齐',
  onClick() {
    const items = this.layerSelectData
    // 寻找中间值
    let center = 0
    for (let i = 0, l = items.length; i < l; i++) {
      center += items[i].y + items[i].height / 2
    }
    center /= items.length
    // 居中对齐
    for (let i = 0, l = items.length; i < l; i++) {
      items[i].y = center - items[i].height / 2
    }
    this.setHostory('vertical_center')
  }
}
