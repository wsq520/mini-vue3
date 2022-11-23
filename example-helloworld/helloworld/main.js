import { createApp } from '../../lib/mini-vue.esm.js'
import { App } from '../helloworld/App.js'

const rootContainer = document.querySelector('#app')
createApp(App).mount(rootContainer) 