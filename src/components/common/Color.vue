<template>
  <div class="color-box">
    <div
      class='color-drag'
      @mousemove="colorLineMove"
    >
      <div
        class="line"
        :style="{width: width + 'px'}"
      ></div>
      <div
        class="point"
        :style="{left: ((getValue() - 6) * (width / 255)) + 'px', backgroundColor: colorHex}"
        @mousedown="colorLineDown"
      >
        <div
          class="hex block-text"
          v-if="moveColor"
        >{{colorHex}}</div>
      </div>
    </div>

    <div class='color-list'>
      <i
        v-for="item in colorList"
        :key="item"
        :class='{"hover": item == colorHex}'
        :uk-tooltip=item
        :style='{"background-color": item}'
        @click="colorSelect(item)"
      ></i>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Color',
  props: {
    value: {
      type: [Number, String],
      default: 255
    },
    width: {
      type: Number,
      default: 255
    }
  },
  data() {
    return {
      moveColor: false,
      colorHex: '',
      colorList: ['#ffffff', '#f5f5f5', '#eeeeee', '#dddddd']
    }
  },
  mounted() {
    this.color()
    document.body.addEventListener('mousemove', e => this.colorLineMove(e))
    document.body.addEventListener('mouseup', e => this.colorLineUp(e))
  },
  watch: {
    value(val) {
      this.color()
    }
  },
  methods: {
    color() {
      if (typeof this.value === 'string') {
        this.colorHex = this.value
      } else {
        let hex = this.value.toString(16)
        if (hex.length === 1) {
          hex = '0' + hex
        }
        this.colorHex = `#${hex}${hex}${hex}`
      }
    },
    getValue() {
      if (typeof this.value === 'string') {
        return parseInt(this.value.substr(1, 2), 16)
      } else {
        return this.value
      }
    },
    colorLineDown(e) {
      this.moveColor = true
      this.startClientX = e.clientX
      this.startValue = this.getValue()
    },
    colorLineMove(e) {
      if (this.moveColor) {
        let value =
          this.startValue + (e.clientX - this.startClientX) / (this.width / 255)
        value = Math.min(value, 255)
        value = Math.max(value, 0)
        value = value | 0
        if (typeof this.value === 'string') {
          let hex = value.toString(16)
          if (hex.length === 1) {
            hex = '0' + hex
          }
          this.$emit('change', `#${hex}${hex}${hex}`)
        } else {
          this.$emit('change', value)
        }
      }
    },
    colorLineUp() {
      this.moveColor = false
    },
    colorSelect(color) {
      if (typeof this.value === 'string') {
        this.$emit('change', color)
      } else {
        this.$emit('change', parseInt(color.substr(1, 2), 16))
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.color-box {
  display: flex;
  .color-drag {
    height: 50px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    .main {
      height: 50px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .line {
      height: 6px;
      background-color: #fff;
      border-radius: 3px;
      background: linear-gradient(to left, #fff, #000);
      border: 0.5px solid #666;
      position: relative;
    }
    .point {
      width: 18px;
      height: 18px;
      border-radius: 9px;
      position: absolute;
      left: -6px;
      top: 16px;
      background-color: #fff;
      border: 0.5px solid #666;
      .hex {
        position: absolute;
        bottom: 20px;
        left: -20px;
        right: -20px;
        background-color: #333;
        border: 0.5px solid #666;
        height: 20px;
        color: #fff;
        text-align: center;
        line-height: 20px;
        font-size: 12px;
      }
    }
  }
  .color-list {
    display: flex;
    align-items: center;
    i {
      width: 18px;
      height: 18px;
      margin-right: 10px;
      border-radius: 50%;
    }
    .hover {
      border: 1px solid #85abff;
    }
  }
}
</style>
