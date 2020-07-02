export default {
  icon: 'yidong',
  text: '移动工具 V',
  cursor: 'default',
  option: {
    autoSelect: {
      text: '自动选择',
      value: true,
      type: 'switch'
    }
  },
  moveEle: null,
  mouseDown(event) {
    const self = this.menus.move
    self.option.autoSelect.value &&
      this.selectLayerInRange(event, 'point')
    if (self.moveEle) {
      // 删除遗留错误操作
      this.pageEle.removeChild(self.moveEle)
      delete self.moveEle
      self.moveEle = null
    }
  },
  mouseMove(event) {
    const items = this.layerSelectData
    if (items.length === 0) return
    const self = this.menus.move
    const moveX = event.offsetX - event.start.offsetX
    const moveY = event.offsetY - event.start.offsetY
    if ((moveX !== 0 || moveY !== 0) && !self.moveEle) {
      const moveEle = (self.moveEle = this.createElement('div', {
        position: 'absolute',
        left: '0px',
        top: '0px',
        width: this.pageEle.offsetWidth + 'px',
        height: this.pageEle.offsetHeight + 'px',
        'z-index': 999
      }))
      for (let i = 0, l = items.length; i < l; i++) {
        const item = items[i]
        moveEle.appendChild(
          this.createElement('div', {
            position: 'absolute',
            border: '1px dashed #999',
            left: item.x + 'px',
            top: item.y + 'px',
            width: item.width + 'px',
            height: item.height + 'px',
            borderRadius:
              item.type === 'radius-rect'
                ? '5px'
                : item.type === 'rect'
                  ? '0px'
                  : '375px'
          })
        )
      }
      this.pageEle.appendChild(moveEle)
    }
    self.moveEle &&
      this.setElementStyle(self.moveEle, {
        left: moveX + 'px',
        top: moveY + 'px'
      })
  },
  mouseUp(event) {
    const items = this.layerSelectData
    if (items.length === 0) return
    const moveX = event.offsetX - event.start.offsetX
    const moveY = event.offsetY - event.start.offsetY
    if (moveX === 0 && moveY === 0) return
    for (let i = 0; i < items.length; i++) {
      if (event.ctrlKey) {
        // 复制
        this.layerList.push({
          ...items[i],
          name: items[i].name + ' 复制',
          key: this.getKey(),
          x: items[i].x + moveX,
          y: items[i].y + moveY
        })
        this.setHostory('copy')
      } else {
        // 移动
        items[i].x += moveX
        items[i].y += moveY
        this.setSttributeForm()
        this.setHostory('move')
      }
    }
    if (this.menus.move.moveEle) {
      this.pageEle.removeChild(this.menus.move.moveEle)
      delete this.menus.move.moveEle
      this.menus.move.moveEle = null
    }
  }
}
