import { createApp } from 'vue'
import './style/reset.less'
import App from './App.vue'
import filterNotIntNumber from './directives'
const app = createApp(App);
app.directive('number',filterNotIntNumber);
app.mount('#app')