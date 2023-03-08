<template>
  <div id="app" class="display-flex box-column">
    <div class="box-flex1">
      <router-view/>
    </div>
  </div>
</template>

<script>
import mixin from '@/utils/mixin'

export default {
  name: 'App',
  data () {
    return {
    }
  },
  mixins: [mixin],
  created () {
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="less">
  @import "./style/normal";

  #app {
    font-size: 28px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*min-height: 100vh;*/
    height: 100vh;
    max-width: 750px;
    margin: 0 auto;
    > .box-flex1 {
      overflow-y: hidden;

      > div {
        height: 100%;
      }
    }
  }
</style>
