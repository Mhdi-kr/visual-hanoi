<template>
  <div class="full-height-container">
    <div id="app" class="columns hanoi-container has-text-centered">
      <section id="A" class="column">
        <draggable v-model="myArray">
          <transition-group>
            <div v-for="element in myArray" :key="element.id" class="card mb-2 py-1 has-background-info">
              {{element.name}}
            </div>
          </transition-group>
        </draggable>
      </section>
      <section id="B" class="column">
        <draggable v-model="myArray">
          <transition-group>
            <div v-for="element in myArray" :key="element.id" class="card mb-2 py-1 has-background-info">
              {{element.name}}
            </div>
          </transition-group>
        </draggable>
      </section>
      <section id="C" class="column">
        <draggable v-model="myArray">
          <transition-group>
            <div v-for="element in myArray" :key="element.id" class="card mb-2 py-1 has-background-info">
              {{element.name}}
            </div>
          </transition-group>
        </draggable>
      </section>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: 'App',
  components: {
    draggable,
  },
  data: () => ({
    myArray: [
      {
        id:123,
        name:'asdasd'
      },
      {
        id:1234,
        name:'asdasdasd'
      },
      {
        id:1233,
        name:'asdasdasdas'
      }
    ]
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
