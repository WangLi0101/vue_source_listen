import { baseHandlers } from './baseHandlers'
const proxyMap = new WeakMap()

export function reactive(target: object) {
  return createReactiveObject(target, baseHandlers, proxyMap)
}

function createReactiveObject(
  target: object,
  baseHandlers: ProxyHandler<any>,
  proxyMap: WeakMap<object, any>
) {
  if (proxyMap.has(target)) {
    return proxyMap.get(target)
  }
  const proxy = new Proxy(target, baseHandlers)
  proxyMap.set(target, proxy)
  return proxy
}
