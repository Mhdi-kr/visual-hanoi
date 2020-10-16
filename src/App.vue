<template>
  <div class="full-height-container">
    <div id="app" class="columns hanoi-container has-text-centered" style="align-items:flex-end !important;">
      <section id="A" class="column">
            <div v-for="element in A.slice().reverse()" :key="element" class="card mb-2 py-1 has-background-info has-text-white">
              {{element}}
            </div>
      </section>
      <section id="B" class="column">
            <div v-for="element in B.slice().reverse()" :key="element" class="card mb-2 py-1 has-background-info has-text-white">
              {{element}}
            </div>
      </section>
      <section id="C" class="column">
            <div v-for="element in C.slice().reverse()" :key="element" class="card mb-2 py-1 has-background-info has-text-white">
              {{element}}
            </div>
      </section>
    </div>
    <button @click="solve">do</button>
  </div>
</template>

<script>

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
export default {
  name: 'App',
  methods: {
    solve: async function () {
      let popped;
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
        await sleep(1000)
      }
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
    A: [4,2],
    B: [3,1],
    C: []
  }),
}
</script>

<style>
.full-height-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.hanoi-container {
  width: 700px;
}
</style>
