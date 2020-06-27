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
          class="icon"
          :key="option.value"
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
  methods: {
    optionInput(key, value) {
      this.$emit('input', { key, value })
    },
    btnClick(key) {
      this.$emit('btn-click', { key })
    },
    inputShowInput(key, e) {
      this.$emit('input', { key, value: e.target.value })
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
