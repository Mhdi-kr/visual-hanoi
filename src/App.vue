<template>
  <section style="height: 100vh">
    <div class="full-height-container">
      <div id="app" class="columns hanoi-container has-text-centered is-align-items-flex-end">
        <section id="A" class="column is-align-items-flex-start">
          <disk v-for="(element) in A.slice().reverse()" :key="element" :index="element"/>
        </section>
        <section id="B" class="column is-align-items-flex-start">
          <disk v-for="(element) in B.slice().reverse()" :key="element" :index="element"/>
        </section>
        <section id="C" class="column is-align-items-flex-start">
          <disk v-for="(element) in C.slice().reverse()" :key="element" :index="element"/>
        </section>
      </div>
    </div>
    <div class="panels card is-rounded px-4 is-flex">
      <button class="button mr-1 is-primary" @click="settings" style="top: 50px">
        <i class="fa fa-cog"></i>
      </button>
      <button class="button is-fullwidth is-primary" :class="{ 'is-loading':isSolving }" @click="solve" style="top: 50px">
        <i class="fa fa-play" v-if="!isSolving"></i>
      </button>
    </div>
  </section>
</template>

<script>

import disk from "@/components/disk";

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
export default {
  name: 'App',
  components: {
    disk
  },
  methods: {
    settings: function (){
    },
    solve: async function () {
      let popped;
      this.isSolving = true
      for (let i = 0; i < this.instructions.length; i++) {
        switch (this.instructions[i].from) {
          case "A":
            popped = this.A.pop()
            break
          case "B":
            popped = this.B.pop()
            break
          case "C":
            popped = this.C.pop()
            break
        }
        switch (this.instructions[i].to) {
          case "A":
            this.A.push(popped)
            break
          case "B":
            this.B.push(popped)
            break
          case "C":
            this.C.push(popped)
            break
        }
        await sleep(750)
      }
      this.isSolving = false
    },
    move: function (){
      setTimeout(()=>{

      })
    }
  },
  data: () => ({
    instructions: [
      { from: 'A', to: 'C' },
      { from: 'B', to: 'C' },
      { from: 'B', to: 'A' },
      { from: 'C', to: 'B' },
      { from: 'C', to: 'A' },
      { from: 'B', to: 'A' },
      { from: 'A', to: 'B' },
      { from: 'A', to: 'C' },
      { from: 'B', to: 'C' },
      { from: 'A', to: 'B' },
      { from: 'C', to: 'A' },
      { from: 'C', to: 'B' },
      { from: 'A', to: 'B' },
      { from: 'A', to: 'C' },
      { from: 'B', to: 'C' },
      { from: 'B', to: 'A' },
      { from: 'C', to: 'A' },
      { from: 'B', to: 'C' },
      { from: 'A', to: 'B' },
      { from: 'A', to: 'C' },
      { from: 'B', to: 'C' }
    ],
    initial: {
      A: [4,2],
      B: [3,1],
      C: []
    },
    A: [4,2],
    B: [3,1],
    C: [],
    isSolving: false,
  }),
}
</script>

<style>
.full-height-container {
  background-color: aliceblue;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.hanoi-container {
  width: 700px;
  height: 700px;
  padding-bottom: 300px;
}
.panels {
  width: 500px;
  margin: auto;
  height: 130px;
  bottom: 200px;
}
</style>
