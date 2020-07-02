export default {
  icon: 'huizhi',
  cursor: 'crosshair',
  text: '绘制工具 I',
  option: {
    type: {
      text: '',
      value: 'radius-rect',
      type: 'radio',
      option: [
        {
          text: '圆角矩形',
          icon: 'yuanjiao-rect',
          value: 'radius-rect'
        },
        { text: '矩形', icon: 'rect', value: 'rect' },
        { text: '圆形', icon: 'yuan', value: 'circle' }
      ]
    },
    color: {
      text: '',
      value: 255,
      type: 'color',
      color() {
        let c16 = this.menus.draw.option.color.value.toString(16)
        if (c16.length === 1) {
          c16 = '0' + c16
        }
        return `#${c16}${c16}${c16}`
      }
    }
  },
  getSelectDiv() {
    const option = this.menus.draw.option
    return this.createElement('div', {
      borderRadius:
        option.type.value === 'radius-rect'
          ? '5px'
          : option.type.value === 'rect'
            ? '0px'
            : '375px',
      backgroundColor: option.color.color.call(this)
    })
  },
  onSelect(event) {
    const option = this.menus.draw.option
    this.layerList.push({
      ...event,
      type: option.type.value,
      color: option.color.color.call(this),
      key: this.getKey(),
      name: '层 ' + this.layerList.length
    })
    this.setHostory('add')
  }
}
