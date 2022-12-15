import {
  createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style/index.less'
import 'normalize.css'
import 'amfe-flexible'
// window.localStorage.removeItem('openid');
const app = createApp(App)
app.use(store);
app.use(router);
app.mount('#app');