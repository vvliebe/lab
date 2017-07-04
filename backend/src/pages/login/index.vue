<template>
  <div :class="$style.container">
    <div :class="$style.main">
      <clock :class="{[$style.clock]: showLoginModal || showRegisterModal}" :time="now"></clock>
    </div>
    <div :class="$style.modal" v-if="showLoginModal || showRegisterModal">
      <input type="password" v-model="password" placeholder="输入密码">
      <i :class="['iconfont', 'icon-go', $style.iconGo]" @click="login"></i>
      <i :class="['iconfont', 'icon-cancel', $style.iconCancel]" @click="hideModal"></i>
    </div>
  </div>
</template>
<script>
  import Clock from '@/components/clock/index'
  import keyshortcut from 'keyshortcut'
  import { UserAPI } from '@/apis'
  export default {
    data () {
      return {
        now: null,
        timerId: '',
        showLoginModal: false,
        showRegisterModal: false,
        password: ''
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
          if (this.showRegisterModal) return
          this.showLoginModal = true
        },
        'escape': () => {
          this.hideModal()
        },
        'enter': () => {
          this.login()
        },
        'alt+alt+alt+alt': () => {
          if (this.showLoginModal) return
          this.showRegisterModal = true
        }
      })
    },
    methods: {
      async login () {
        let params = {
          name: 'admin',
          password: this.password
        }
        if (this.showRegisterModal) {
          let {code} = await UserAPI.register(params)
          if (code === 200) {
            this.$notify.success({
              title: '注册成功'
            })
          }
        } else {
          let {code, data: {token, user}} = await UserAPI.login(params)
          if (code === 200) {
            sessionStorage.setItem('access-token', token)
            sessionStorage.setItem('user', JSON.stringify(user))
            this.$notify.success({
              title: '登陆成功',
              duration: 500,
              onClose: () => {
                this.$router.push({ name: 'home' })
              }
            })
          }
        }
      },
      hideModal () {
        this.showLoginModal = false
        this.showRegisterModal = false
        this.password = ''
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
