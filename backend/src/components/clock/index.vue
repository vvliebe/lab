<template>
  <div :class="$style.container">
   <div :class="$style.box">
     <div :class="$style.top">
       <span>{{hours}}</span>
     </div>
     <div :class="$style.bottom">
       <span>{{hours}}</span>
     </div>
   </div>
   <div :class="$style.box">
     <div :class="$style.top">
       <span>{{minutes}}</span>
     </div>
     <div :class="$style.bottom">
       <span>{{minutes}}</span>
     </div>
   </div>
  </div>
</template>
<script>
  export default {
    props: {
      time: Date
    },
    data () {
      return {
        changeMinute: false,
        oldMinutes: null
      }
    },
    computed: {
      hours () {
        if (!this.time) return null
        let hours = this.time.getHours()
        if (hours < 10) return `0${hours}`
        return hours
      },
      minutes () {
        if (!this.time) return null
        let minutes = this.time.getMinutes()
        if (minutes < 10) return `0${minutes}`
        return minutes
      }
    }
  }
</script>
<style lang="scss" module>
  $box-size: 50vh;
  .container {
    display: flex;
    color: #fff;
    font-family: monospace;
  }
  .box {
    display: flex;
    flex-direction: column;
    width: $box-size;
    height: $box-size;
    border-radius: $box-size / 12;
    overflow: hidden;
    &:first-child {
      margin-right: $box-size / 5;
    }
  }
  .top,
  .bottom {
    position: relative;
    flex: 1;
    background: #161616;
    overflow: hidden;
    span {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      left: 0;
      width: $box-size;
      height: $box-size;
      font-size: $box-size / 1.2;
    }
  }
  .top {
    margin-bottom: 4px;
    span {
      top: 0;
    }
  }
  .bottom {
    span {
      bottom: 0;
    }
  }
</style>
