import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import './assets/styles/normalize.css'
import './assets/styles/reset.css'
import './assets/styles/property.css'
import VueBus from 'vue-bus'
import SlideVerify from 'vue-monoplasty-slide-verify';

Vue.use(ElementUI)
Vue.use(VueBus)
Vue.use(SlideVerify)
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
