<template>
  <div :class="$style.container">
    <div :class="$style.main">
      <clock :class="{[$style.clock]: showLoginModal}" :time="now"></clock>
    </div>
    <div :class="$style.modal" v-if="showLoginModal">
      <input type="password" placeholder="输入密码">
      <i :class="['iconfont', 'icon-go', $style.iconGo]" @click="login"></i>
      <i :class="['iconfont', 'icon-cancel', $style.iconCancel]" @click="showLoginModal = false"></i>
    </div>
  </div>
</template>
<script>
  import Clock from '@/components/clock/index'
  import keyshortcut from 'keyshortcut'
  export default {
    data () {
      return {
        now: null,
        timerId: '',
        showLoginModal: false
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
      keyshortcut.config({
        DEBUG: true,
        timeout: 300
      })
      keyshortcut.register({
        ' ': () => {
          this.showLoginModal = true
        },
        'escape': () => {
          this.showLoginModal = false
        },
        'enter': () => {
          this.login()
        }
      })
    },
    methods: {
      login () {
        console.log('login')
      }
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
    .clock {
      filter: blur(15px);
    }
  }
  .modal,
  {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, .15);
    input {
      width: 130px;
      height: 25px;
      padding: 0 10px;
      margin-right: 15px;
      border-radius: 4px;
      background: rgba(255, 255, 255, .5);
      border: none;
      outline: none;
      box-sizing: border-box;
      box-shadow: 0 0 1px #333;
    }
    ::placeholder {
      color: #bbb;
    }
    .iconGo,
    .iconCancel {
      color: #eee;
      font-size: 24px;
    }
    .iconCancel {
      position: absolute;
      bottom: 40px;
    }
  }
</style>
