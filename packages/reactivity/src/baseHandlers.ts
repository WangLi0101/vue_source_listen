import { track, trigger } from './effect'

function createGetter() {
  return function get(target: object, key: string | symbol, receiver: Object) {
    // 依赖收集
    track(target, key)
    return Reflect.get(target, key, receiver)
  }
}

function createSetter() {
  return function set(
    target: object,
    key: string | symbol,
    value: unknown,
    receiver: Object
  ) {
    // 触发更新
    const res = Reflect.set(target, key, value, receiver)
    trigger(target, key, value)
    return res
  }
}
const get = createGetter()
const set = createSetter()

export const baseHandlers: ProxyHandler<object> = {
  get,
  set
}
