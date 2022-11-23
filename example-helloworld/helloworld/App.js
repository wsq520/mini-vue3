import { h } from '../../lib/mini-vue.esm.js'

export const App = {
  render() {
    return h("div", {
      id: "root",
      class: ["red", "hard"]
    }, "hello mini-vue")
  },
  setup() {
    return {
      msg: "mini-vue"
    }
  }
}