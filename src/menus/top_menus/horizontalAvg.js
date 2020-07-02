export default {
  type: 'button',
  icon: 'horizontal-avg',
  text: '水平方向平均分布',
  onClick() {
    const items = this.layerSelectData.sort((a, b) => {
      return a.x - b.x
    })
    // 元素总宽度
    let allWidth = 0
    // 寻找最左边的
    let left = items[0].x
    // 寻找最右边的
    const right = items[items.length - 1].x
    for (let i = 0, l = items.length - 1; i < l; i++) {
      allWidth += items[i].width
    }
    // 间距
    const spacing = (right - left - allWidth) / (items.length - 1)
    for (let i = 0, l = items.length - 1; i < l; i++) {
      items[i].x = left
      left += items[i].width + spacing
    }
    this.setHostory('horizontal_avg')
  }
}
