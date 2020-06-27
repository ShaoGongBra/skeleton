<template>
  <div
    class="loading"
    :style="{width: topx(width), height: topx(width)}"
  >
    <div
      class="child"
      :key="'child-'+(index + 1)"
      v-for="(item,index) in lines"
      :class="' child-'+(index + 1)"
      :style="{
        marginTop: topx(- r),
        height: topx(r * 2),
        transform: 'rotate(' + (index * 45 + 90) + 'deg)',
        left: topx(item.left),
        top: topx(item.top),
        backgroundColor: colors[color] || colors.dark
      }"
    ></div>
  </div>
</template>
<script>
export default {
  name: 'Loading',
  props: {
    size: {
      type: Number,
      default: 48
    },
    color: {
      type: String,
      default: 'dark'
    }
  },
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
@keyframes line-spin-fade-loader {
  50% {
    opacity: 0.3;
  }

  100% {
    opacity: 1;
  }
}

.loading {
  position: relative;
  .child {
    border-radius: 1.5px;
    animation-fill-mode: both;
    position: absolute;
    width: 3px;
    margin-left: -1.5px;
  }
  .child-1 {
    animation: line-spin-fade-loader 0.8s 0s infinite ease-in-out;
  }
  .child-2 {
    animation: line-spin-fade-loader 0.8s 0.1s infinite ease-in-out;
  }
  .child-3 {
    animation: line-spin-fade-loader 0.8s 0.2s infinite ease-in-out;
  }
  .child-4 {
    animation: line-spin-fade-loader 0.8s 0.3s infinite ease-in-out;
  }
  .child-5 {
    animation: line-spin-fade-loader 0.8s 0.4s infinite ease-in-out;
  }
  .child-6 {
    animation: line-spin-fade-loader 0.8s 0.5s infinite ease-in-out;
  }
  .child-7 {
    animation: line-spin-fade-loader 0.8s 0.6s infinite ease-in-out;
  }
  .child-8 {
    animation: line-spin-fade-loader 0.8s 0.7s infinite ease-in-out;
  }
}
</style>
