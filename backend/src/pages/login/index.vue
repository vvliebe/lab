<template>
  <div :class="$style.container">
    <div :class="$style.main">
      <clock :time="now"></clock>
    </div>
    <div :class="$style.modal"></div>
  </div>
</template>
<script>
  import Clock from '@/components/clock/index'
  export default {
    data () {
      return {
        now: null,
        timerId: ''
      }
    },
    components: {
      Clock
    },
    created () {
      this.now = new Date()
      this.timerId = setInterval(() => {
        this.now = new Date()
      }, 1000)
    },
    beforeDestroy () {
      clearInterval(this.timerId)
    }
  }
</script>

<style lang="scss" module>
  .container {
    position: relative;
    width: 100vw;
    height: 100vh;
  }
  .main {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: #000;
  }
  .modal {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
</style>
