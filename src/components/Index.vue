<template>
  <div class="page-editor">
    <div class="option">
      <div class="left">
        <controls-form
          :form="menus[menu].option"
          @input="optionInput"
        ></controls-form>
      </div>
      <div class="right">
        <controls-form
          :form="topMenus"
          @btn-click="btnClick"
          @input="topMenuInput"
        ></controls-form>
      </div>
    </div>
    <div
      class="edit-option"
      :class="{show: layerEdit.show}"
    >
      <div></div>
      <controls-form
        :form="layerEdit.menus"
        @btn-click="editBtnClick"
      ></controls-form>
    </div>
    <div class="menus">
      <i
        v-for="(item, key) in menus"
        class="icon"
        :key="key"
        :class="'icon-'+item.icon+(key === menu?' hover':'')"
        @click="menu = key"
        :uk-tooltip="item.text"
      ></i>
    </div>
    <div
      class="edit-main"
      :style="{cursor: menus[menu].cursor}"
    >
      <div
        class="page"
        :style="{cursor: pageMove.spaceKeyStatus?'move':menus[menu].cursor}"
      >
        <div
          class="item"
          v-for="item in layerList"
          :key="item.key"
          :class="item.type + (layerSelect.indexOf(item.key) !== -1?' hover':'')"
          :style="{backgroundColor: item.color, width: item.width+'px',height: item.height+'px',left: item.x+'px',top: item.y+'px'}"
        >
        </div>
      </div>
    </div>
    <div class="right-menus">
      <i
        v-for="(item, key) in rightMenus"
        class="icon"
        :key="key"
        :class="'icon-'+item.icon+(item.show?' hover':'')"
        @click="item.show = !item.show"
        :uk-tooltip="item.text"
      ></i>
    </div>
    <div class="right-menus-show">
      <div
        v-if="rightMenus.param.show"
        class="min-window attribute"
      >
        <div class="head block-text">
          属性
        </div>
        <div class="form">
          <template v-for="(item, key) in attribute.form">
            <div
              v-if="item.type === 'row'"
              class="row"
              :key="key"
            >
              <div
                v-for="(row, rowKey) in item.child"
                class="item input"
                :key="rowKey"
              >
                <div class="name block-text">{{row.text}}</div>
                <div class="input-div">
                  <input
                    @input="attributeInput(rowKey, $event, row)"
                    :value="attribute.formData[rowKey]"
                    :type="row.inputType"
                  >
                </div>
              </div>
            </div>
            <div
              v-if="item.type === 'radio'"
              class="item radio"
              :key="key"
            >
              <div class="name block-text">{{item.text}}</div>
              <div class="value">
                <i
                  v-for="option in item.option"
                  class="icon radio-item"
                  :key="option.value"
                  :class="'icon-'+option.icon+(attribute.formData[key] === option.value?' hover':'')"
                  @click="attributeInput(key, option.value, item)"
                ></i>
              </div>
            </div>
            <div
              v-if="item.type === 'color'"
              class="item color"
              :key="key"
            >
              <div class="name block-text">{{item.text}}</div>
              <color
                :value="attribute.formData[key]"
                @change="attributeInput(key, $event, item)"
                :width="140"
              >
              </color>
            </div>
          </template>
        </div>
      </div>
      <div
        v-if="rightMenus.layer.show"
        class="min-window layer"
      >
        <div class="head block-text">
          图层管理
        </div>
        <div class="scroll">
          <draggable
            :list="layerList"
            ghost-class="ghost"
          >
            <div
              class="item"
              v-for="item in layerList"
              :key="item.key"
              :class="{hover: layerSelect.indexOf(item.key) !== -1}"
              @click="layerClick(item, $event)"
            >
              <div class="name block-text">{{item.name}}</div>
            </div>
          </draggable>
        </div>
      </div>
      <div
        v-if="rightMenus.hostory.show"
        class="min-window hostory"
      >
        <div class="head block-text">
          操作记录
        </div>
        <div class="scroll">
          <div
            class="item"
            v-for="(item, key) in hostory"
            :key="item.key"
            :class="{
                        hover: hostoryIndex === null ? key === hostory.length - 1 : hostoryIndex === key,
                        disable: hostoryIndex !== null && key > hostoryIndex
                    }"
            @click="selectHostory(key)"
          >
            <div class="name block-text">{{item.name}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import draggable from 'vuedraggable'
import color from './common/Color'
import controlsForm from './common/ControlsForm'
import loading from './common/Loading'
import * as tools from '../menus/tools'
import * as topMenus from '../menus/topMenus'

export default {
  name: 'Index',
  components: {
    draggable,
    color,
    loading,
    'controls-form': controlsForm
  },
  data() {
    return {
      // 转换后的页面宽度
      pageWidth: 750,
      // 整个编辑区域元素
      editEle: null,
      // 画布背景元素
      editMainEle: null,
      // 画布元素
      pageEle: null,
      pageMove: {
        // 空格键是否按下
        spaceKeyStatus: false,
        start: { x: 0, y: 0 },
        // 是否在页面范围内开始移动
        isPageStart: false,
        onStart() {
          this.pageMove.isPageStart = true
        },
        onMove(event) {
          if (!this.pageMove.spaceKeyStatus || !this.pageMove.isPageStart) {
            return
          }
          this.setElementStyle(this.editMainEle, {
            transform:
              'translate(' +
              (event.originalX -
                event.start.originalX +
                this.pageMove.start.x) +
              'px,' +
              (event.originalY -
                event.start.originalY +
                this.pageMove.start.y) +
              'px)'
          })
        },
        onEnd(event) {
          this.pageMove.isPageStart = false
          this.pageMove.setStart.call(this)
        },
        setStart() {
          this.pageMove.start = { ...this.pageMove.getMove.call(this) }
        },
        getMove() {
          const transform = document.defaultView
            .getComputedStyle(this.editMainEle, null)
            .transform.replace(')', '')
            .split(',')
          return {
            x: transform[4] | 0,
            y: transform[5] | 0
          }
        }
      },
      // 左侧功能菜单
      menus: tools,
      // 选中的菜单
      menu: 'move',
      // 标记鼠标点击状态
      mouseClick: false,
      // 图层数据
      layerList: [],
      // 选中的图层
      layerSelect: [],
      // 选中图层的数据筛选
      layerSelectData: [],
      // 图层编辑
      layerEdit: {
        show: false,
        menus: {
          close: {
            type: 'button',
            text: '关闭',
            icon: 'guanbi',
            onClick() {
              this.layerEdit.show = false
            }
          },
          submit: {
            type: 'button',
            text: '确定',
            icon: 'gou'
          }
        },
        onEnd(event, direction) {
          const setSize = {
            left(ele, x, y) {
              ele.x += x
              ele.width -= x
            },
            right(ele, x, y) {
              ele.width += x
            },
            top(ele, x, y) {
              ele.y += y
              ele.height -= y
            },
            bottom(ele, x, y) {
              ele.height += y
            }
          }
          const items = this.layerSelectData
          for (let i = 0, l = items.length; i < l; i++) {
            setSize[direction](
              items[i],
              event.offsetX - event.start.offsetX,
              event.offsetY - event.start.offsetY
            )
          }
        }
      },
      // 顶部右侧操作按钮
      topMenus: topMenus,
      // 右侧按钮
      rightMenus: {
        param: {
          show: true,
          icon: 'canshu',
          text: '属性'
        },
        layer: {
          show: false,
          icon: 'layers',
          text: '图层'
        },
        hostory: {
          show: false,
          icon: 'lishi',
          text: '操作记录'
        }
      },
      // 参数表单
      attribute: {
        formData: {},
        form: {
          row: {
            type: 'row',
            child: {
              x: {
                type: 'input',
                text: 'x',
                inputType: 'number'
              },
              y: {
                type: 'input',
                text: 'y',
                inputType: 'number'
              }
            }
          },
          row1: {
            type: 'row',
            child: {
              width: {
                type: 'input',
                text: '宽',
                inputType: 'number'
              },
              height: {
                type: 'input',
                text: '高',
                inputType: 'number'
              }
            }
          },
          type: {
            text: '类型',
            type: 'radio',
            option: [
              { text: '圆角矩形', icon: 'yuanjiao-rect', value: 'radius-rect' },
              { text: '矩形', icon: 'rect', value: 'rect' },
              { text: '圆形', icon: 'yuan', value: 'circle' }
            ]
          },
          color: {
            text: '颜色',
            type: 'color'
          }
        }
      },
      hostory: [],
      hostoryIndex: null
    }
  },
  mounted() {
    const editEle = this.editEle = document.querySelector('.page-editor')
    const editMainEle = this.editMainEle = editEle.querySelector('.edit-main')
    const pageEle = this.pageEle = editEle.querySelector('.page')
    // 选择div的变量
    let selectDiv = null
    // 记录开始点的位置
    const startPos = {
      x: 0,
      y: 0,
      offsetX: 0,
      offsetY: 0
    }
    // 判断是否在页面点击
    const isPageDown = event => {
      return event.path.indexOf(editMainEle) !== -1
    }
    // 获取在页面上的位置
    const getPageOffset = event => {
      const pageTransform = this.pageMove.getMove.call(this)
      const left =
        event.pageX -
        editEle.offsetLeft -
        editMainEle.offsetLeft -
        pageEle.offsetLeft -
        pageTransform.x
      const top =
        event.pageY -
        editEle.offsetTop -
        editMainEle.offsetTop -
        pageEle.offsetTop -
        pageTransform.y
      return {
        // 相对于page的定位 不会超出page范围
        x:
          left < 0
            ? 0
            : left > pageEle.offsetWidth
              ? pageEle.offsetWidth
              : left,
        y:
          top < 0 ? 0 : top > pageEle.offsetHeight ? pageEle.offsetHeight : top,
        // 相对于page的定位
        offsetX: left,
        offsetY: top,
        // 不使用平面位置前的原始位置
        originalX: left + pageTransform.x,
        originalY: top + pageTransform.y,
        ctrlKey: event.ctrlKey || event.metaKey,
        altKey: event.altKey,
        shiftKey: event.shiftKey
      }
    }
    editEle.onmousedown = event => {
      if (isPageDown(event)) {
        const offset = getPageOffset(event)
        for (const key in offset) {
          if (offset.hasOwnProperty(key)) {
            startPos[key] = offset[key]
          }
        }
        // 删除某些情况下 不会消失的选择框
        if (selectDiv) {
          this.pageEle.removeChild(selectDiv)
          // delete selectDiv
          selectDiv = null
        }
        if (!this.pageMove.spaceKeyStatus) {
          this.mouseClick = true
          if (this.menus[this.menu].getSelectDiv) {
            selectDiv = this.menus[this.menu].getSelectDiv.call(this, offset)
            selectDiv.style.position = 'absolute'
            selectDiv.style.left = offset.x + 'px'
            selectDiv.style.top = offset.y + 'px'
            pageEle.appendChild(selectDiv)
          }
          this.menus[this.menu].mouseDown &&
            this.menus[this.menu].mouseDown.call(this, offset)
        } else {
          event.path.indexOf(pageEle) !== -1 &&
            this.pageMove.onStart &&
            this.pageMove.onStart.call(this, offset)
        }
      }
    }
    editEle.onmousemove = event => {
      if (!this.mouseClick && !this.pageMove.spaceKeyStatus) return
      const offset = getPageOffset(event)
      offset.start = startPos
      if (!this.pageMove.spaceKeyStatus && selectDiv) {
        const width = offset.x - selectDiv.offsetLeft
        const height = offset.y - selectDiv.offsetTop
        selectDiv.style.transform =
          'translate(' +
          (width < 0 ? width : 0) +
          'px,' +
          (height < 0 ? height : 0) +
          'px)'
        selectDiv.style.width = Math.abs(width) + 'px'
        selectDiv.style.height = Math.abs(height) + 'px'
      }
      !this.pageMove.spaceKeyStatus &&
        this.menus[this.menu].mouseMove &&
        this.menus[this.menu].mouseMove.call(this, offset)
      this.pageMove.onMove && this.pageMove.onMove.call(this, offset)
    }
    editEle.onmouseup = event => {
      if (!this.mouseClick && !this.pageMove.spaceKeyStatus) return
      const offset = getPageOffset(event)
      offset.start = startPos
      if (selectDiv) {
        this.pageEle.removeChild(selectDiv)
        const size = {
          x: Math.min(startPos.x, offset.x),
          y: Math.min(startPos.y, offset.y),
          width: Math.abs(startPos.x - offset.x),
          height: Math.abs(startPos.y - offset.y)
        }
        if (size.width !== 0 && size.height !== 0) {
          this.menus[this.menu].onSelect &&
            this.menus[this.menu].onSelect.call(this, size)
        }
        // delete selectDiv
        selectDiv = null
      }
      this.mouseClick = false
      !this.pageMove.spaceKeyStatus &&
        this.menus[this.menu].mouseUp &&
        this.menus[this.menu].mouseUp.call(this, offset)
      this.pageMove.onEnd && this.pageMove.onEnd.call(this, offset)
    }

    document.onkeydown = e => {
      const keys = {
        ctrl: e.ctrlKey || e.metaKey,
        alt: e.altKey,
        shift: e.shiftKey
      }
      switch (e.keyCode) {
        case 32:
          // 按下空格
          this.onSpaceKey('down', keys)
          break
        case 38:
          // 上
          this.onDirection('top', keys)
          break
        case 40:
          this.onDirection('bottom', keys)
          // 下
          break
        case 37:
          this.onDirection('left', keys)
          // 左
          break
        case 39:
          this.onDirection('right', keys)
          // 右
          break
        default:
          break
      }
    }
    document.onkeyup = e => {
      const keys = {
        ctrl: e.ctrlKey || e.metaKey,
        alt: e.altKey,
        shift: e.shiftKey
      }
      switch (e.keyCode) {
        case 32:
          // 放开空格
          this.onSpaceKey('up', keys)
          break
        case 46:
          // 删除
          this.onDeleteKey()
          break
        case 86:
          // 移动
          this.menu = 'move'
          break
        case 73:
          // 绘制
          this.menu = 'draw'
          break
        case 77:
          // 选区
          this.menu = 'select'
          break
        case 90:
          // 撤销
          this.editHostory(keys)
      }
    }
  },
  methods: {
    // 编辑数据初始化
    init(data) {
      data.content = JSON.parse(data.content)
      if (data.content.list) {
        // 转换比例
        const scale = (data.content.width || 750) / 375
        this.pageWidth = data.content.width || 750
        this.layerList = data.content.list.map(item => {
          item.x /= scale
          item.y /= scale
          item.width /= scale
          item.height /= scale
          return item
        })
        this.topMenus.title.value = data.name
      }
      this.setHostory('init')
    },
    // 获取当前时间戳
    getTime() {
      return new Date().getTime()
    },
    // 获取唯一KEY
    getKey() {
      function randomString(len) {
        len = len || 32
        const $chars =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefhijklmnopqrstuvwxyz123456789'
        const maxPos = $chars.length
        let pwd = ''
        for (let i = 0; i < len; i++) {
          pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
        }
        return pwd
      }

      const str = this.getTime() + randomString(16)
      if (window.btoa) {
        return window.btoa(str)
      }
      return str
    },

    /** 创建元素 */
    createElement(name, style = {}, attr = {}) {
      const ele = document.createElement(name)
      for (const key in style) {
        if (style.hasOwnProperty(key)) {
          ele.style[key] = style[key]
        }
      }
      for (const key in attr) {
        if (attr.hasOwnProperty(key)) {
          ele.elesetAttribute(key, style[key])
        }
      }
      return ele
    },

    /** 设置元素样式 */
    setElementStyle(ele, style = {}) {
      for (const key in style) {
        if (style.hasOwnProperty(key)) {
          ele.style[key] = style[key]
        }
      }
    },

    pageMouseOver() {
      // console.log('进入')
    },
    pageMouseOut() {
      // console.log('离开')
    },

    onSpaceKey(type) {
      // 空格键按下和抬起 用来移动画布
      if (this.mouseClick) return
      this.pageMove.spaceKeyStatus = type === 'down'
      if (!this.pageMove.spaceKeyStatus) {
        this.pageMove.setStart.call(this)
      }
    },

    // 上下左右键点击
    onDirection(type, keys) {
      const negate = {
        left: 'right',
        right: 'left',
        top: 'bottom',
        bottom: 'top'
      }
      if (keys.ctrl || keys.shift) {
        // ctrl 放大 shift 缩小
        // 缩放选中图层
        this.layerEdit.onEnd &&
          this.layerEdit.onEnd.call(
            this,
            {
              offsetX: type === 'left' ? -1 : type === 'right' ? 1 : 0,
              offsetY: type === 'top' ? -1 : type === 'bottom' ? 1 : 0,
              start: {
                offsetX: 0,
                offsetY: 0
              }
            },
            keys.shift ? negate[type] : type
          )
      } else {
        // 移动选中图层
        this.menus.move.mouseUp &&
          this.menus.move.mouseUp.call(this, {
            offsetX: type === 'left' ? -1 : type === 'right' ? 1 : 0,
            offsetY: type === 'top' ? -1 : type === 'bottom' ? 1 : 0,
            start: {
              offsetX: 0,
              offsetY: 0
            }
          })
      }
    },

    /**
     * 功能菜单输入
     */
    optionInput(e) {
      this.menus[this.menu].option[e.key].value = e.value
    },

    /**
     * 顶部按钮点击
     */
    btnClick(e) {
      this.topMenus[e.key].onClick && this.topMenus[e.key].onClick.call(this)
    },

    /**
     * 顶部按钮输入
     */
    topMenuInput(e) {
      this.topMenus[e.key].onInput &&
        this.topMenus[e.key].onInput.call(this, e.value)
    },

    /**
     * 编辑状态按钮点击
     */
    editBtnClick(e) {
      this.layerEdit.menus[e.key].onClick &&
        this.layerEdit.menus[e.key].onClick.call(this)
    },

    /**
     * 点击图层管理
     */
    layerClick(item, e) {
      // 编辑状态下不可操作
      if (this.layerEdit.show) return
      const index = this.layerSelect.indexOf(item.key)
      if (e.ctrlKey || e.metaKey) {
        if (index === -1) {
          this.layerSelect.push(item.key)
        } else {
          this.layerSelect.splice(index, 1)
        }
      } else {
        const isKey = index === -1 || this.layerSelect.length > 1
        this.layerSelect.splice(0, this.layerSelect.length)
        isKey && this.layerSelect.push(item.key)
      }
      this.onLayerSelect()
    },

    /**
     * 图层选中改变事件
     */
    onLayerSelect() {
      this.layerSelectData = this.getSelectLayer()
      this.setSttributeForm()
    },

    /**
     * 设置层属性表单
     */
    setSttributeForm() {
      const items = this.layerSelectData
      if (items.length > 0) {
        // this.attribute.formData = items[0]
        const values = { ...items[0] }
        for (let i = 0, l = items.length; i < l; i++) {
          for (const key in items[i]) {
            if (items[i].hasOwnProperty(key)) {
              if (values[key] !== items[i][key] && values[key] !== undefined) {
                if (key === 'color') {
                  values[key] = '#fff'
                } else {
                  delete values[key]
                }
              }
            }
          }
        }
        this.attribute.formData = values
      } else {
        this.attribute.formData = {}
      }
    },
    /**
     * 图层属性编辑事件
     */
    attributeInput(key, value, item) {
      if (!this.attribute.formData.color) return
      if (item.type === 'input') {
        value = value.target.value
        if (item.inputType === 'number') {
          value = Number(value)
        }
      }
      if (typeof this.attribute.formData[key] === 'undefined') {
        Vue.set(this.attribute.formData, key, value)
      } else {
        this.attribute.formData[key] = value
      }
      const items = this.layerSelectData
      for (let i = 0, l = items.length; i < l; i++) {
        items[i][key] = value
      }
      switch (key) {
        case 'type':
          this.setHostory('type')
          break
        default:
          break
      }
    },

    /**
     * 点击键盘del按键 删除选中图层
     */
    onDeleteKey() {
      const items = this.layerSelectData
      for (let i = 0, l = items.length; i < l; i++) {
        this.layerList.splice(this.layerList.indexOf(items[i]), 1)
      }
      this.layerSelect.splice(0, this.layerSelect.length)
      this.onLayerSelect()
      this.setHostory('del')
    },

    /**
     * 获取选中的图层
     */
    getSelectLayer() {
      return this.layerList.filter(
        item => this.layerSelect.indexOf(item.key) !== -1
      )
    },

    /**
     * 获取指定范围内的图层
     */
    selectLayerInRange(event, type, set) {
      if (type === 'point') {
        !event.ctrlKey && this.layerSelect.splice(0, this.layerSelect.length)
        for (let i = this.layerList.length - 1; i >= 0; i--) {
          const item = this.layerList[i]
          if (
            item.x < event.x &&
            item.y < event.y &&
            item.x + item.width > event.x &&
            item.y + item.height > event.y
          ) {
            this.layerSelect.indexOf(item.key) === -1 &&
              this.layerSelect.push(item.key)
            break
          }
        }
      } else {
        // set === 'replace' && this.layerSelect.splice(0, this.layerSelect.length)
        const newKeys = []
        for (let i = this.layerList.length - 1; i >= 0; i--) {
          const item = this.layerList[i]
          if (this.rectIsContain(event, item)) {
            newKeys.push(item.key)
          }
        }
        if (this.layerSelect.length === 0) {
          this.layerSelect.push(...newKeys)
        } else {
          switch (set) {
            case 'replace':
              this.layerSelect.splice(0, this.layerSelect.length)
              this.layerSelect.push(...newKeys)
              break
            case 'union':
              // 并集
              newKeys.map(key => {
                if (this.layerSelect.indexOf(key) === -1) {
                  this.layerSelect.push(key)
                }
              })
              break
            case 'complement':
              // 补集
              newKeys.map(key => {
                const index = this.layerSelect.indexOf(key)
                if (index !== -1) {
                  this.layerSelect.splice(index, 1)
                }
              })
              break
            case 'intersection':
              // 交集
              const intersection = []
              newKeys.map(key => {
                const index = this.layerSelect.indexOf(key)
                if (index !== -1) {
                  intersection.push(key)
                }
              })
              this.layerSelect.splice(0, this.layerSelect.length)
              this.layerSelect.push(...intersection)
              break
            default:
              break
          }
        }
      }
      this.onLayerSelect()
    },

    /**
     * 矩形的包含判断
     * @param outRect :{x:number,y:number,width:number,height:number}   包含者
     * @param innerRect :{x:number,y:number,width:number,height:number}   被包含者
     * @returns : boolean   表示包含者是否包含被包含者
     *
     * # 注意
     * 包含及相等都属于包含
     */
    rectIsContain(outRect, innerRect) {
      const left = outRect.x <= innerRect.x
      const right = outRect.width + outRect.x >= innerRect.width + innerRect.x
      const top = outRect.y <= innerRect.y
      const bottom =
        outRect.height + outRect.y >= innerRect.height + innerRect.y

      return left && right && top && bottom
    },

    setHostory(type) {
      const types = {
        init: {
          name: '打开文档'
        },
        add: {
          name: '插入图层'
        },
        del: {
          name: '删除图层'
        },
        move: {
          name: '移动图层'
        },
        zoom: {
          name: '缩放图层'
        },
        type: {
          name: '改变类型'
        },
        color: {
          name: '改变颜色'
        },
        copy: {
          name: '复制图层'
        },
        left: {
          name: '左对齐'
        },
        right: {
          name: '右对齐'
        },
        horizontal_center: {
          name: '横向居中对齐'
        },
        top: {
          name: '上对齐'
        },
        bottom: {
          name: '下对齐'
        },
        vertical_center: {
          name: '竖向居中对齐'
        },
        horizontal_avg: {
          name: '横向平均分布'
        },
        vertical_avg: {
          name: '竖向平均分布'
        }
      }
      // 判断是否回退了
      if (this.hostoryIndex !== null) {
        this.hostory.splice(this.hostoryIndex + 1)
        this.hostoryIndex = null
      }
      // 删除多余的操作
      if (this.hostory.length > 11) {
        this.hostory.splice(1, 1)
      }
      this.hostory.push({
        name: types[type].name,
        data: JSON.stringify(this.layerList)
      })
    },
    editHostory(keys) {
      let index = -1
      if (keys.shift && keys.ctrl) {
        // 还原
        index = this.hostoryIndex === null ? -1 : this.hostoryIndex + 1
      } else if (keys.ctrl) {
        // 撤销
        index =
          this.hostoryIndex === null
            ? this.hostory.length - 2
            : this.hostoryIndex - 1
      }
      const list = this.hostory[index]
      if (list) {
        this.hostoryIndex = index
        this.layerList = JSON.parse(list.data)
      }
    },
    selectHostory(index) {
      if (this.hostoryIndex === index) return
      this.hostoryIndex = index
      const list = this.hostory[index]
      if (list) {
        this.layerList = JSON.parse(list.data)
      }
    }
  }
}
</script>

<style scoped>
.page-editor {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: #404040;
}
.block-text {
  user-select: none;
  cursor: default;
}

.option {
  position: absolute;
  z-index: 10;
  top: 10px;
  left: 10px;
  right: 10px;
  height: 50px;
  background-color: #101010;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 3px;
  padding: 5px 10px;
}

.option .left,
.option .right {
  display: flex;
  align-items: center;
}

.edit-option {
  position: absolute;
  z-index: 10;
  top: 10px;
  left: 10px;
  right: 10px;
  height: 50px;
  background-color: #101010;
  display: none;
  align-items: center;
  justify-content: space-between;
  border-radius: 3px;
  padding: 5px 10px;
}

.edit-option.show {
  display: flex;
}

.menus {
  position: absolute;
  left: 10px;
  top: 70px;
  display: flex;
  flex-direction: column;
  background-color: #101010;
  border-radius: 5px;
  z-index: 10;
  padding: 10px;
}

.menus i {
  color: #fff;
  padding: 5px 8px;
  border-radius: 3px;
  font-size: 20px;
}

.menus i.hover {
  background-color: #333;
}

.edit-main {
  position: absolute;
  left: -1000px;
  right: -1000px;
  top: -1000px;
  bottom: -1000px;
  z-index: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.edit-main .page {
  position: relative;
  width: 375px;
  height: 812px;
  background-color: #fff;
  overflow: hidden;
}

.edit-main .page .item {
  box-sizing: border-box;
  position: absolute;
}

.edit-main .page .item.hover {
  border: 1px dashed #85abff;
}

.edit-main .page .item.radius-rect {
  border-radius: 5px;
}

.edit-main .page .item.rect {
  border-radius: 0;
}

.edit-main .page .item.circle {
  border-radius: 375px;
}

.min-window {
  width: 200px;
  background-color: #101010;
  margin-top: 10px;
}

.min-window:nth-child(1) {
  margin-top: 0;
}

.min-window .head {
  color: #fff;
  height: 40px;
  font-size: 14px;
  line-height: 40px;
  padding-left: 10px;
  border-bottom: 1px solid #666;
}

.min-window .scroll {
  height: 250px;
  overflow-y: scroll;
  overflow-x: hidden;
}

/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
.min-window .scroll::-webkit-scrollbar {
  width: 4px;
  height: 4px;
  background-color: #101010;
}

/*定义滚动条轨道 内阴影+圆角*/
.min-window .scroll::-webkit-scrollbar-track {
  /* -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3); */
  /* border-radius: 5px; */
  background-color: #333;
  margin-left: 3px;
}

/*定义滑块 内阴影+圆角*/
.min-window .scroll::-webkit-scrollbar-thumb {
  border-radius: 10px;
  /* -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3); */
  background-color: #555;
}

.min-window.layer .item {
  padding: 0 10px;
  line-height: 30px;
  height: 30px;
  overflow: hidden;
}

.min-window.layer .item.hover {
  background-color: #666;
}

.min-window.layer .item .name {
  font-size: 14px;
  color: #fff;
}

.min-window .form {
  padding: 8px 0;
}

.min-window .form .item {
  display: flex;
  align-items: center;
  padding: 3px 8px;
}

.min-window .form .item .name {
  font-size: 12px;
  margin: 5px;
  flex-shrink: 0;
  color: #999;
}

.min-window .form .item .input-div {
  flex: 1;
}

.min-window .form .item input {
  width: 100%;
  border: none;
  background-color: #333;
  color: #999;
  padding: 3px 5px;
  font-size: 12px;
}

.min-window .form .row {
  display: flex;
  align-items: center;
}

.min-window .form .row .item {
  flex: 1;
}

.min-window .form .radio .value {
  display: flex;
  align-items: center;
}

.min-window .form .radio .radio-item {
  padding: 0 3px;
  border-radius: 5px;
  margin-right: 5px;
  color: #fff;
  font-size: 20px;
}

.min-window .form .radio .radio-item.hover {
  background-color: #333;
}

.min-window .form .color .value {
  display: flex;
  align-items: center;
}

.min-window .form .color .color-item {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  box-sizing: border-box;
  margin-right: 10px;
}

.min-window .form .color .color-item.hover {
  background-color: #333;
  border: 2px solid #999;
}

.min-window .form .color-box {
  display: block;
}

.min-window.hostory .item {
  padding: 0 10px;
  line-height: 30px;
  height: 30px;
  overflow: hidden;
}

.min-window.hostory .item.hover {
  background-color: #666;
}

.min-window.hostory .item .name {
  font-size: 14px;
  color: #fff;
}

.min-window.hostory .item.disable .name {
  color: #666;
}

.right-menus {
  position: absolute;
  right: 10px;
  top: 70px;
  display: flex;
  flex-direction: column;
  background-color: #101010;
  border-radius: 5px;
  z-index: 10;
  padding: 10px;
}

.right-menus i {
  color: #fff;
  padding: 2px 8px;
  border-radius: 3px;
  font-size: 20px;
  margin-top: 10px;
}

.right-menus i:nth-child(1) {
  margin-top: 0;
}

.right-menus i.hover {
  background-color: #333;
}

.right-menus-show {
  position: absolute;
  right: 70px;
  top: 70px;
  bottom: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
.right-menus-show::-webkit-scrollbar {
  width: 4px;
  height: 4px;
  background-color: #101010;
}

/*定义滚动条轨道 内阴影+圆角*/
.right-menus-show::-webkit-scrollbar-track {
  /* -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3); */
  /* border-radius: 5px; */
  background-color: #333;
  margin-left: 3px;
}

/*定义滑块 内阴影+圆角*/
.right-menus-show::-webkit-scrollbar-thumb {
  border-radius: 10px;
  /* -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3); */
  background-color: #555;
}
</style>
