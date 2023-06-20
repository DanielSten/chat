import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Axios from "axios";


Axios.defaults.baseURL = 'http://yii2-back';
const app = createApp(App)

app.use(router)

app.mount('#app')
