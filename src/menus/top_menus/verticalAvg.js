export default {
  type: 'button',
  icon: 'vertical-avg',
  text: '竖直方向平均分布',
  onClick() {
    const items = this.layerSelectData.sort((a, b) => {
      return a.y - b.y
    })
    // 元素总高度
    let allheight = 0
    // 寻找最上边的
    let top = items[0].y
    // 寻找最下边的
    let bottom = items[items.length - 1].y
    for (let i = 0, l = items.length - 1; i < l; i++) {
      allheight += items[i].height
    }
    // 间距
    const spacing = (bottom - top - allheight) / (items.length - 1)
    for (let i = 0, l = items.length - 1; i < l; i++) {
      items[i].y = top
      top += items[i].height + spacing
    }
    this.setHostory('vertical_avg')
  }
}
