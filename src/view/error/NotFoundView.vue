<template>
  <div class="not-found-view">
    <el-row class="load-tips-picture">
      <img src="static/img/error/error404.jpg">
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'not-found-view',
    data() {
      return {}
    },
    components: {},
    computed: {},
    mounted() {},
    methods: {}
  }

</script>

<style lang='scss' scoped>
  .not-found-view {
    .load-tips-picture {
      width: 100%;
      img {
        max-width: 100%;
        height: auto;
      }
    }
  }

</style>
