import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'


const app = createApp(App)

//elementUI icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(router).use(VueAxios, axios)
app.mount('#app')
