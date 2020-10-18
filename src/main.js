import Vue from 'vue'
import App from './App.vue'
import 'bulma/bulma.sass'
import 'animate.css/animate.min.css'
import 'font-awesome/css/font-awesome.min.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
