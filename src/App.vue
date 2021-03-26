<template>
  <section style="height: 100vh">
    <div class="full-height-container">
      <div class="about" style="text-align:center">
        <h1>Complex Hanoi Solver visualization</h1>
        <p>by <strong>Mahdi Karimi</strong> october 2020</p>
      </div>
      <div
        v-if="instructions"
        id="app"
        class="columns hanoi-container has-text-centered is-align-items-flex-end"
      >
        <section id="A" class="column is-align-items-flex-start">
          <disk
            v-for="element in A.slice().reverse()"
            :key="element"
            :index="element"
            :total="diskPerColumn * 3 + 1"
          />
        </section>
        <section id="B" class="column is-align-items-flex-start">
          <disk
            v-for="element in B.slice().reverse()"
            :key="element"
            :index="element"
            :total="diskPerColumn * 3 + 1"
          />
        </section>
        <section id="C" class="column is-align-items-flex-start">
          <disk
            v-for="element in C.slice().reverse()"
            :key="element"
            :index="element"
            :total="diskPerColumn * 3 + 1"
          />
        </section>
      </div>
    </div>
    <div
      class="panels card is-rounded px-4"
      style="display: flex; justify-content: center; align-items: center"
    >
      <div class="is-flex" v-if="appState === 'config'" style="width: 100%">
        <input
          class="input"
          type="number"
          v-model="input"
          style="margin-right: 10px"
          placeholder="number of disks per column"
        />
        <button class="button" @click="apply">apply</button>
      </div>
      <div class="is-flex" v-else style="width: 100%">
        <button
          class="button mr-1 is-primary"
          :disabled="isSolving"
          @click="openConfig"
        >
          <i class="fa fa-cog"></i>
        </button>
        <button
          class="button is-fullwidth is-primary"
          :class="{ 'is-loading': isSolving }"
          @click="solve"
        >
          <i class="fa fa-play" v-if="!isSolving"></i>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import disk from "@/components/disk";

class HanoiSolver {
  constructor(n) {
    console.log(`for ${n} we have:`);
    let filler = 1;
    while (this.c.stack.length < n) {
      this.a.stack.push(filler);
      this.b.stack.push(filler + 1);
      this.c.stack.push(filler + 2);
      filler += 3;
    }
    // this.printState()
    this.extendedHanoi(n, this.a, this.b, this.c);
    // console.log(this.history)
  }
  a = {
    name: "A",
    stack: [],
  };
  b = {
    name: "B",
    stack: [],
  };
  c = {
    name: "C",
    stack: [],
  };
  history = [];
  extendedHanoi(n, A, B, C) {
    if (n == 1) {
      console.log("here");
      this.move(C, B);
      this.move(A, C);
      this.move(B, A);
      this.move(B, C);
      this.move(A, C);
    } else {
      this.extendedHanoi(n - 1, A, B, C);
      this.hanoi(3 * n - 2, C, A, B);
      this.move(A, C);
      this.hanoi(3 * n - 1, B, A, C);
    }
  }
  hanoi(n, A, B, C) {
    if (n === 1) {
      this.move(A, C);
    } else {
      this.hanoi(n - 1, A, C, B);
      this.move(A, C);
      this.hanoi(n - 1, B, A, C);
    }
  }
  // printState(){
  //     console.log(this.a.stack,this.b.stack,this.c.stack)
  // }
  move(A, B) {
    const popped = A.stack.pop();
    B.stack.push(popped);
    this.history.push({
      from: A.name,
      to: B.name,
    });
    // this.printState()
  }
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export default {
  name: "App",
  components: {
    disk,
  },
  methods: {
    apply() {
      if (this.input < 8 && this.input > 0) {
        this.diskPerColumn = parseInt(this.input);
        this.instructions = null;
        let a = [];
        let b = [];
        let c = [];
        a[0] = 1;
        b[0] = 2;
        c[0] = 3;
        for (let index = 1; index < this.diskPerColumn; index++) {
          a[index] = a[index - 1] + 3;
          b[index] = b[index - 1] + 3;
          c[index] = c[index - 1] + 3;
        }
        this.A = a;
        this.B = b;
        this.C = c;
        let temp = new HanoiSolver(this.input).history;
        this.instructions = temp;
        this.appState = "ready";
      } else {
        window.alert("input range is bigger than 0 and less than 8.");
      }
    },
    closeConfig() {
      this.appState = "ready";
    },
    openConfig() {
      this.appState = "config";
    },
    settings: function () {},
    solve: async function () {
      let popped;
      this.isSolving = true;
      for (let i = 0; i < this.instructions.length; i++) {
        switch (this.instructions[i].from) {
          case "A":
            popped = this.A.pop();
            break;
          case "B":
            popped = this.B.pop();
            break;
          case "C":
            popped = this.C.pop();
            break;
        }
        switch (this.instructions[i].to) {
          case "A":
            this.A.push(popped);
            break;
          case "B":
            this.B.push(popped);
            break;
          case "C":
            this.C.push(popped);
            break;
        }
        await sleep(400);
      }
      this.isSolving = false;
      this.appState = "finished";
    },
  },
  data: () => ({
    instructions: null,
    A: [1, 4],
    B: [2, 5],
    C: [3, 6],
    diskPerColumn: 1,
    input: 1,
    isSolving: false,
    appState: "config",
  }),
};
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
