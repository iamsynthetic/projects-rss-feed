import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons';

//createApp(App).use(store).use(router).mount('#app')


const app = createApp(App);
app.use(store);
app.use(router);
app.component('BootstrapIcon', BootstrapIcon);
app.mount('#app');