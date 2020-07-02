export default {
  type: 'button',
  icon: 'baocun',
  text: '保存',
  loading: false,
  onClick() {
    // const scale = this.pageWidth / 375
    // const post = {
    //   name: this.topMenus.title.value,
    //   content: JSON.stringify({
    //     width: this.pageWidth,
    //     list: this.layerList.map(item => {
    //       const list = { ...item }
    //       list.x *= scale
    //       list.y *= scale
    //       list.width *= scale
    //       list.height *= scale
    //       return list
    //     })
    //   })
    // }
    this.topMenus.submit.loading = true
  }
}
