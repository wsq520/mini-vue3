import { createComponentInstance, setupComponent } from "./component"
import { isObject } from "../shared/index"

export function render(vnode, container) {
  patch(vnode, container)
}
 
function patch(vnode, container) { 
  console.log(vnode.type)
  // 判断节点是一个element还是一个组件
  if (typeof vnode.type === "string") {
    processElement(vnode, container)
  } else if (isObject(vnode.type)) {
    processComponent(vnode, container)
  }
}

function processElement(vnode: any, container: any) {
  // 初始化
  mountElement(vnode, container )
}

function mountElement(vnode: any, container: any) {
  const el = document.createElement(vnode.type)

  const { children } = vnode
  el.textContent = children

  const { props } = vnode
  for (const key in props) {
    const val = props[key]
    el.setAttribute(key, val)
  }

  container.append(el)
  console.log(container)
  
}

function processComponent(vnode: any, container: any) {
  mountComponent(vnode, container)
}

function mountComponent(vnode: any, container: any) {
  const instance = createComponentInstance(vnode)

  setupComponent(instance)
  setupRenderEffect(instance, container)
}

function setupRenderEffect(instance: any, container:any) {
  const { proxy } = instance
  const subTree = instance.render.call(proxy)

  patch(subTree, container)
}