<template>
  <div class="top-form">
    <div
      class="item"
      v-for="(item, key) in form"
      :key="key"
      :class="item.type"
    >
      <template v-if="item.type === 'radio'">
        <i
          v-for="option in item.option"
          class="icon.text"
          :key="option"
          :class="'icon-'+option.icon+(item.value === option.value?' hover':'')"
          :uk-tooltip="option.text"
          @click="optionInput(key, option.value)"
        ></i>
      </template>
      <template v-if="item.type === 'color'">
        <color
          :value="item.value"
          :width="180"
          @change="optionInput(key, $event)"
        ></color>
      </template>
      <template v-if="item.type === 'switch'">
        <div
          :class="{hover: item.value}"
          @click="optionInput(key, !item.value)"
        >
          <i
            class="icon"
            :class="'icon-'+(item.value?'xuanzhong':'yuan1')"
          ></i>
          <span class="block-text">{{item.text}}</span>
        </div>
      </template>
      <template v-if="item.type === 'button'">
        <loading
          v-if="!!item.loading"
          :size="38"
          color="blank"
        ></loading>
        <i
          v-if="!item.loading"
          class="icon"
          :class="'icon-'+item.icon"
          :uk-tooltip="item.text"
          @click="btnClick(key)"
        ></i>
      </template>
      <template v-if="item.type === 'input-show'">
        <i
          class="icon"
          :class="'icon-'+item.icon"
          :uk-tooltip="item.text"
          @click="btnClick(key)"
        ></i>
        <div
          v-if="item.show"
          class="input"
        >
          <input
            autofocus="autofocus"
            :value="item.value"
            :placeholder="item.placeholder"
            @input="inputShowInput(key, $event)"
          >
        </div>
      </template>
      <template v-if="item.type === 'help'">
        <i
          class="icon"
          :class="'icon-'+item.icon"
          :uk-tooltip="item.text"
          @click="btnClick(key)"
        ></i>
        <div
          v-if="item.show"
          class="info block-text"
          v-html="item.content"
        ></div>
      </template>
    </div>
  </div>
</template>
<script>
import color from './Color'
import loading from './Loading'
export default {
  name: 'ControlsForm',
  components: {
    color,
    loading
  },
  props: ['form'],
  data() {
    return {
      lines: [],
      width: 0,
      r: 0,
      colors: {
        dark: '#7a7a7a',
        blank: '#fff'
      }
    }
  },
  mounted() {
    this.getList(this.size)
  },
  methods: {
    topx(num) {
      return `${num / 2}px`
    },
    getTriangleWidth(hypotenuse, angle = 0) {
      return {
        opposite: hypotenuse * Math.cos((angle * 2 * Math.PI) / 360), // 对边
        frontier: hypotenuse * Math.sin((angle * 2 * Math.PI) / 360) //  临边
      }
    },
    getList(size) {
      const halfSize = size / 2 // 正方形的一半长
      const r = size / 6 // 空心圆的半径
      const l = (size - r * 2) / 2 // 线的长度
      const halfL = l / 2 // 线一半的长度
      const centerR = halfL + r // 定位中心点的圆的半径
      let lines = []
      for (let i = 0; i < 8; i++) {
        const { opposite: left, frontier: top } = this.getTriangleWidth(
          centerR,
          i * 45
        )
        lines.push({
          left: halfSize + left,
          top: halfSize + top
        })
      }
      this.width = size
      this.r = halfL
      this.lines = lines
    },
    event: function(data, e) {
      if (typeof e.event === 'undefined') {
        e.event = { type: data.type, index: [] }
        e.stopPropagation()
      }
      e.event.index.unshift(data.index)
      this.$emit('comp-event', e)
    }
  }
}
</script>

<style lang='scss' scoped>
.top-form {
  display: flex;
  align-items: center;
  .item {
    display: flex;
    align-items: center;
    padding: 0 10px;
    &.button {
      padding: 0 2px;
    }
    &.radio {
      i {
        color: #fff;
        font-size: 18px;
        padding: 0 8px;
        border-radius: 3px;
        &.hover {
          background-color: #333;
        }
      }
    }
    &.switch {
      div {
        display: flex;
        align-items: center;
      }
      span {
        font-size: 12px;
        color: #fff;
        margin-left: 5px;
      }
      i {
        font-size: 20px;
        color: #fff;
      }
    }
    &.button {
      width: 34px;
      display: flex;
      justify-content: center;
      i {
        color: #fff;
        font-size: 18px;
        padding: 0 8px;
        border-radius: 3px;
        &:hover {
          background-color: #333;
        }
      }
    }
    &.input-show {
      padding: 0 2px;
      position: relative;
      i {
        color: #fff;
        font-size: 18px;
        padding: 0 8px;
        border-radius: 3px;
        &:hover {
          background-color: #333;
        }
      }
      .input {
        position: absolute;
        top: 40px;
        left: -50px;
        right: -50px;
        background-color: #101010;
        border-radius: 5px;
        padding: 5px;
        border: 1px solid #666;
        input {
          width: 100%;
          border: none;
          background-color: transparent;
          color: #999;
          font-size: 12px;
          &::placeholder {
            color: #333;
          }
        }
      }
    }
    &.help {
      padding: 0 2px;
      position: relative;
      i {
        color: #fff;
        font-size: 18px;
        padding: 0 8px;
        border-radius: 3px;
        &:hover {
          background-color: #333;
        }
      }
      .info {
        position: absolute;
        top: 40px;
        left: -80px;
        right: -80px;
        background-color: #101010;
        border-radius: 5px;
        padding: 10px;
        border: 1px solid #666;
        color: #fff;
        h3 {
          margin: 10px 0;
          font-size: 16px;
          font-weight: bold;
        }
        p {
          margin: 5px 0;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
