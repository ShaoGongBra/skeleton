<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

@font-face {font-family: "icon";
  src: url('//at.alicdn.com/t/font_1821703_7ux4glefpgw.eot?t=1590909905176'); /* IE9 */
  src: url('//at.alicdn.com/t/font_1821703_7ux4glefpgw.eot?t=1590909905176#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
  url('//at.alicdn.com/t/font_1821703_7ux4glefpgw.woff?t=1590909905176') format('woff'),
  url('//at.alicdn.com/t/font_1821703_7ux4glefpgw.ttf?t=1590909905176') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('//at.alicdn.com/t/font_1821703_7ux4glefpgw.svg?t=1590909905176#icon') format('svg'); /* iOS 4.1- */
}

.icon {
  font-family: "icon" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-shuxing:before {
  content: "\e65b";
}

.icon-canshu:before {
  content: "\e608";
}

.icon-lishi:before {
  content: "\e60e";
}

.icon-layers:before {
  content: "\e601";
}

.icon-bingji:before {
  content: "\e665";
}

.icon-buji:before {
  content: "\e672";
}

.icon-square:before {
  content: "\e61a";
}

.icon-jiaoji:before {
  content: "\e60d";
}

.icon-exportdaochu:before {
  content: "\e6c8";
}

.icon-printdaoru:before {
  content: "\e6c9";
}

.icon-help:before {
  content: "\e639";
}

.icon-biaoti:before {
  content: "\e607";
}

.icon-vertical-avg:before {
  content: "\e663";
}

.icon-horizontal-avg:before {
  content: "\e7d0";
}

.icon-gou:before {
  content: "\e605";
}

.icon-bianji:before {
  content: "\e677";
}

.icon-baocun:before {
  content: "\e727";
}

.icon-guanbi:before {
  content: "\e60c";
}

.icon-jurassic_horizalign-center:before {
  content: "\e706";
}

.icon-jurassic_horizalign-right:before {
  content: "\e707";
}

.icon-jurassic_horizalign-left:before {
  content: "\e708";
}

.icon-jurassic_verticalalign-bottom:before {
  content: "\e710";
}

.icon-jurassic_verticalalign-top:before {
  content: "\e711";
}

.icon-jurassic_verticalalign-center:before {
  content: "\e712";
}

.icon-xuanzhong:before {
  content: "\e668";
}

.icon-yuan1:before {
  content: "\e62f";
}

.icon-rect:before {
  content: "\e628";
}

.icon-yuanjiao-rect:before {
  content: "\e64e";
}

.icon-yuan:before {
  content: "\e742";
}

.icon-xuxiankuang:before {
  content: "\e7cf";
}

.icon-yidong:before {
  content: "\e653";
}

.icon-xuanzegongju:before {
  content: "\e796";
}

.icon-huizhi:before {
  content: "\e600";
}

</style>
