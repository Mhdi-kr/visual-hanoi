<template>
  <div class="card mb-2 py-1 has-background-info has-text-white animate__animated " :style="'width:' + 50*index + 'px;margin: auto;'" :class="{'animate__fadeInDown animate__faster': isShown, 'animate__fadeOutUp': !isShown}">
    <p class="is-size-5">{{ index }}</p>
  </div>
</template>
<script>
  let index = null
  export default {
    name: 'disk',
    data: () => ({
      isShown: null
    }),
    props: {
      index
    },
    beforeMount() {
      console.log(`${this.index} is mounted`)
      this.isShown = true
    },
    beforeDestroy() {
      console.log(`${this.index} is destroyed`)
      this.isShown = false
    }
  }
</script>
