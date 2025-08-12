import { createDep, type Dep } from './dep'

type KeyToDepMap = Map<string | symbol, Dep>
const triggerMap = new WeakMap<Object, KeyToDepMap>()
let activeEffect: ReactiveEffect | undefined
/**
 * 响应式effect类
 */
export class ReactiveEffect<T = any> {
  public fn: () => T
  constructor(fn: () => T) {
    this.fn = fn
  }
  run() {
    activeEffect = this
    return this.fn()
  }
}

/**
 * 利用 dep 依次跟踪指定 key 的所有 effect
 * @param dep
 */
export function trackEffects(dep: Dep) {
  // activeEffect! ： 断言 activeEffect 不为 null
  dep.add(activeEffect!)
}

/**
 * 依赖收集
 * @param target
 * @param key
 */
export function track(target: object, key: string | symbol) {
  if (!activeEffect) return
  let depsMap = triggerMap.get(target)
  if (!depsMap) {
    triggerMap.set(target, (depsMap = new Map()))
  }
  let deps = depsMap.get(key)
  if (!deps) {
    depsMap.set(key, (deps = createDep()))
  }
  trackEffects(deps)
}

/**
 * 触发更新
 * @param target
 * @param key
 * @param newValue
 */
export function trigger(
  target: object,
  key: string | symbol,
  newValue: unknown
) {
  let depsMap = triggerMap.get(target)
  if (!depsMap) return
  let effectSet = depsMap.get(key)
  if (!effectSet) return
  triggerEffects(effectSet)
}
/**
 * 依次触发所有依赖
 * @param dep
 */
function triggerEffects(dep: Dep) {
  dep.forEach(effect => triggerEffect(effect))
}
/**
 * 触发指定 effect
 * @param effect
 */
function triggerEffect(effect: ReactiveEffect) {
  effect.run()
}

export function effect<T = any>(fn: () => T) {
  const _effect = new ReactiveEffect(fn)
  _effect.run()
}
