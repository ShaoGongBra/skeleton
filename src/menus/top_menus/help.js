export default {
  type: 'help',
  icon: 'help',
  show: false,
  text: '快捷键提示',
  content: `
          <h3>图层管理</h3>
          <p>ctrl + 鼠标左键：选中多个图层</p>
          <h3>选中图层操作</h3>
          <p>方向键：移动选中图层位置</p>
          <p>ctrl + 方向键：放大选中图层</p>
          <p>shift + 方向键：缩小选中图层</p>
          <p>delete：删除选中图层</p>
          <h3>编辑区域</h3>
          <p>空格 + 按下移动鼠标：移动编辑区域</p>
          <h3>移动工具</h3>
          <p>ctrl + 鼠标左键：选中多个图层</p>
          <p>ctrl + 按下并移动鼠标：复制选中的图层到新位置</p>
          <h3>历史记录</h3>
          <p>ctrl + z：撤销更改</p>
          <p>ctrl + shift + z：还原更改</p>
      `,
  onClick() {
    this.topMenus.help.show = !this.topMenus.help.show
  }
}
