export default {
  icon: 'xuxiankuang',
  cursor: 'crosshair',
  text: '文本工具 T',
  option: {
    set: {
      text: '',
      value: 'replace',
      type: 'radio',
      option: [
        { text: '选择', icon: 'square', value: 'replace' },
        { text: '添加到选区', icon: 'bingji', value: 'union' },
        { text: '从选取减去', icon: 'buji', value: 'complement' },
        { text: '选取重叠部分', icon: 'jiaoji', value: 'intersection' }
      ]
    }
  },
  getSelectDiv() {
    return this.createElement('div', {
      border: '1px dashed #999'
    })
  },
  onSelect(event) {
    this.selectLayerInRange(
      event,
      'size',
      this.menus.select.option.set.value
    )
  }
}
