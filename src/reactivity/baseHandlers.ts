import { track, trigger } from './effect'

const get = createGetter()
const set = createSetter()
const readonlyGet = createGetter(true)

// 对创建代理对象时的get操作进行封装
function createGetter(isReadonly = false) {
  return function get(target, key) {
    const res = Reflect.get(target, key)
    if (!isReadonly) {
      // 收集依赖
      track(target, key)
    }
    return res
  }
}

// 对创建代理对象时set操作进行封装
function createSetter() {
  return function set(target, key, value) {
    const res = Reflect.set(target, key, value)
    // 触发依赖
    trigger(target, key)
    return res
  }
}

export const mutableHandlers = {
  get,
  set
}

export const readonlyHandlers = {
  get:readonlyGet,
  set(target, key, value) {
    console.warn("设置属性失败，因为当前对象是只读的")
    return true
  }
}